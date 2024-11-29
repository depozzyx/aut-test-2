import { socket } from '../Socket'
import { TSubscribeProps } from '../types'
import { TAgentStatusUpdate } from './types'

const agentStatusUpdate = ({
  id,
  callback,
}: TSubscribeProps<TAgentStatusUpdate>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'agent:agentStatusUpdate',
    eventName: 'agent:agentStatusUpdate',
  })
}

export const agentSocket = {
  agentStatusUpdate,
}
