// import { TChatElement, TChatMessage } from '@peiko-shared/features/chat/types'
import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

type TCallbackReturn<T> = {
  action: string
  data: T
}
// subscribe to chat
const chat = ({ id, callback }: TSubscribeProps<TCallbackReturn<never>>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'chat:list',
    eventName: 'chat:list',
  })
}
const message = ({ id, callback }: TSubscribeProps<TCallbackReturn<never>>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'chat:message',
    eventName: 'chat:message',
  })
}

export const chatSocket = {
  chat,
  message,
}
