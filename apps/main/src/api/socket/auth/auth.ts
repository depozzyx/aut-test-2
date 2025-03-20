import { TAuthUpdateWS } from '@/api-rest/auth/types'
import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

const authUpdate = ({ id, callback }: TSubscribeProps<TAuthUpdateWS['data']>): void => {
  socket.subscribe({
    id,
    callback,
    scope: `auth:update`,
    eventName: `auth:update`,
  })
}

export const authSocket = {
  authUpdate,
}
