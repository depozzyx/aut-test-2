import { socket } from '../Socket'
import { TSubscribeProps } from '../types'
import { TCallsInit } from './types'

const callInit = ({ id, callback }: TSubscribeProps<TCallsInit>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'call:callInit',
    eventName: 'call:callInit',
  })
}

const callEnd = ({ id, callback }: TSubscribeProps<TCallsInit>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'call:callEnd',
    eventName: 'call:callEnd',
  })
}

export const callSocket = {
  callInit,
  callEnd,
}
