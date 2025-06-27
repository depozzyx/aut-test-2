import { io, Socket } from 'socket.io-client'
import axios from 'axios'
import { errorActions } from '@/features/common/error'
import { API_SOCKET_URL } from '@/constants/config'
import { TStore } from '@/store'
import { E_SOCKET_ERRORS } from '@/constants/socket-errors'
import {
  TDisconnectProps,
  TEmitProps,
  TErrorProps,
  TReconnectProps,
  TUnsubscribeProps,
  TExceptionError,
} from './types'
import { apiAuth } from '../rest/auth'

let store = {} as TStore

export const injectStoreSocket = (_store: TStore): void => {
  store = _store
}

const EMIT_SUBSCRIBE = 'subscribe'
const EMIT_UNSUBSCRIBE = 'unsubscribe'

const EVENT_AUTH = 'auth'

type TSubscribe<T> = {
  id: string
  emit?: string
  eventName: string
  scope: string
  callback: (data: T) => void
  campaignId?: string
}

type TSubscriptionType = 'subscribe' | 'unsubscribe'

export type TEvent<T> = {
  subscribed: boolean
  callback: (data: T) => void
  name: string
  emit?: string
  campaignId?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TScope<T = any> = {
  subscribed: boolean
  events: Map<string, TEvent<T>>
}

const SOCKET_CONFIG = {
  timeout: 2000,
  path: '',
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 1000000,
}

class SocketClass {
  private io?: Socket

  private hasReconnect?: boolean

  private scope: Map<string, TScope>

  private disconnectCallback: Map<string, TDisconnectProps['callback']>

  private reconnectCallback: Map<string, TReconnectProps['callback']>

  private errorCallback: Map<string, TErrorProps['callback']>

  constructor() {
    this.scope = new Map()
    this.disconnectCallback = new Map()
    this.reconnectCallback = new Map()
    this.errorCallback = new Map()
  }

  private isConnected() {
    return this.io && this.io.connected
  }

  private async connect() {
    if (!this.io) {
      try {
        const { data } = await apiAuth.loginWS()
        this.io = io(API_SOCKET_URL, {
          ...SOCKET_CONFIG,
          auth: { token: data.data.token },
        })
      } catch (e) {
        if (!axios.isAxiosError(e) || !e.response) return
        const { data } = e.response
        const { message } = data
        this.disconnect()
        store.dispatch(errorActions.showGlobalError(message))
        return
      }
    }

    const connect = () => {
      this.io?.off(EVENT_AUTH, connect)
      if (this.hasReconnect) {
        this.reconnectCallback.forEach((callback) => {
          callback()
        })
      }
      this.subscription('subscribe')
    }

    this.io.on('connect', () => {
      this.io?.on(EVENT_AUTH, connect)
    })

    this.io.on('disconnect', () => {
      // need show in toastify
      this.subscription('unsubscribe')
      this.hasReconnect = true
      this.disconnectCallback.forEach((callback) => {
        callback()
      })
    })

    this.io.on('error', (e) => {
      this.errorCallback.forEach((callback) => {
        callback()
      })
      this.disconnect()
      // TypeError: v.dispatch is not a function
      try {
        store?.dispatch(errorActions.setSocketError(true))
      } catch {
        //
      }
      console.error(e)
    })

    this.io.on('exception', (e: TExceptionError) => {
      const { error } = e
      if (error === E_SOCKET_ERRORS.AUTH) {
        this.disconnect()
      }
      // TypeError: v.dispatch is not a function
      try {
        store?.dispatch(errorActions.setSocketError(true))
      } catch {
        //
      }
    })
  }

  private subscription(type: TSubscriptionType) {
    const subscribed = type === 'subscribe'
    const emitAction = type === 'subscribe' ? EMIT_SUBSCRIBE : EMIT_UNSUBSCRIBE

    this.scope.forEach((scope, scopeName) => {
      // subscribe/unsubscribe events
      scope.events.forEach((event, eventId) => {
        if (!this.io) return
        if (subscribed && !event.subscribed) {
          this.io.on(event.name, event.callback)
          if (event.emit) {
            this.io?.emit(event.emit)
          }
        }
        if (!subscribed && event.subscribed) {
          this.io.off(event.name, event.callback)
        }
        scope.events.set(eventId, { ...event, subscribed })
      })

      // send scope to subscribe/unsubscribe
      if (subscribed && scope.subscribed) return
      if (!subscribed && !scope.subscribed) return
      this.scope.set(scopeName, { subscribed, events: scope.events })
      if (!this.isConnected()) return

      const campaignId = Array.from(scope.events.values()).find(
        (event) => event.campaignId,
      )?.campaignId
      this.io?.emit(emitAction, { scope: scopeName, campaignId })
    })
  }

  private hasSubscribeId(id: string) {
    let hasId = false

    this.scope.forEach((value) => {
      value.events.forEach((_, key) => {
        if (key === id) {
          hasId = true
        }
      })
    })
    return hasId
  }

  emit({ action, data }: TEmitProps): void {
    if (!this.isConnected()) {
      // need show in toastify
      console.error('Socket not connected')
      return
    }

    this.io?.emit(action, data)
  }

  subscribe<T>(data: TSubscribe<T>): void {
    if (this.hasSubscribeId(data.id)) {
      console.warn(
        `Failed "subscribe". id='${data.id}' already exists. Please use a different id.`,
      )
      return
    }

    const scope = this.scope.get(data.scope)

    const event = {
      name: data.eventName,
      emit: data.emit,
      subscribed: false,
      callback: data.callback,
      campaignId: data?.campaignId,
    }

    if (!scope) {
      this.scope.set(data.scope, {
        subscribed: false,
        events: new Map([[data.id, event]]),
      })
    }

    if (scope) {
      const { events } = scope
      events.set(data.id, event)
    }

    if (this.isConnected()) {
      this.subscription('subscribe')
    }

    if (!this.io) this.connect()
  }

  unsubscribe(id: TUnsubscribeProps): void {
    let scopeName = ''

    this.scope.forEach((scope, name) => {
      scope.events.forEach((event, eventId) => {
        if (eventId !== id) return
        scopeName = name
        this.io?.off(event.name, event.callback)
        scope.events.delete(eventId)
      })
    })

    if (!scopeName) {
      console.warn(`Failed "unsubscribe". id='${id}' not found.`)
      return
    }

    const scope = this.scope.get(scopeName)
    if (scope?.events.size !== 0) return
    this.scope.delete(scopeName)
    if (!this.isConnected()) return
    this.io?.emit(EMIT_UNSUBSCRIBE, { scope: scopeName })
  }

  onDisconnect({ id, callback }: TDisconnectProps): void {
    if (this.disconnectCallback.has(id)) {
      console.warn(
        `Failed "onDisconnect". id='${id}' already exists. Please use a different id.`,
      )
      return
    }
    this.disconnectCallback.set(id, callback)
  }

  offDisconnect(id: TUnsubscribeProps): void {
    if (!this.disconnectCallback.has(id)) {
      console.warn(`Failed "offDisconnect". id='${id}' not found.`)
      return
    }
    this.disconnectCallback.delete(id)
  }

  onReconnect({ id, callback }: TReconnectProps): void {
    if (this.reconnectCallback.has(id)) {
      console.warn(
        `Failed "onReconnect". id='${id}' already exists. Please use a different id.`,
      )
      return
    }
    this.reconnectCallback.set(id, callback)
  }

  offReconnect(id: TUnsubscribeProps): void {
    if (!this.reconnectCallback.has(id)) {
      console.warn(`Failed "offReconnect". id='${id}' not found.`)
      return
    }
    this.reconnectCallback.delete(id)
  }

  onError({ id, callback }: TErrorProps): void {
    if (this.errorCallback.has(id)) {
      console.warn(
        `Failed "onError". id='${id}' already exists. Please use a different id.`,
      )
      return
    }
    this.errorCallback.set(id, callback)
  }

  offError(id: TUnsubscribeProps): void {
    if (!this.errorCallback.has(id)) {
      console.warn(`Failed "offError". id='${id}' not found.`)
      return
    }
    this.errorCallback.delete(id)
  }

  disconnect(): void {
    if (this.io) {
      this.io.removeAllListeners()
      this.io.disconnect()
      this.io = undefined
    }
    this.hasReconnect = false
    this.scope.clear()
    this.disconnectCallback.clear()
    this.reconnectCallback.clear()
  }

  getSate() {
    return {
      hasReconnect: this.hasReconnect,
      scope: this.scope,
      disconnectCallback: this.disconnectCallback,
      reconnectCallback: this.reconnectCallback,
    }
  }

  getInstance() {
    return this.io
  }
}

export const socket = new SocketClass()
