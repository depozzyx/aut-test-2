import { TAgentStatus } from '@/api-rest/agents/types'
import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

const agentStatusUpdate = ({
  id,
  callback,
}: TSubscribeProps<{ status: TAgentStatus['data'] }>): void => {
  socket.subscribe({
    id,
    callback,
    scope: 'agent:agentStatusUpdate',
    eventName: 'agent:agentStatusUpdate',
  })
}

const unsubscribeStatusUpdate = (id: string): void => {
  socket.unsubscribe(id)
}

export const agentSocket = {
  agentStatusUpdate,
  unsubscribeStatusUpdate,
}
