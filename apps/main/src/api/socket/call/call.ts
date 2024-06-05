import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

type TCallbackReturn<T> = {
  action: string
  data: T
}
// subscribe to chat
const callInit = ({
  id,
  callback,
}: TSubscribeProps<
  TCallbackReturn<{
    username: string
    leadId: number
    campaignId: number
    dst: string
  }>
>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'chat:list',
    eventName: 'chat:list',
  })
}

export const callSocket = {
  callInit,
}
