import { socket } from '../Socket'
import { TSubscribeProps } from '../types'
import { TActiveAgent } from '../../rest/agents/types'

const activeAgentsUpdate = ({
  id,
  callback,
}: TSubscribeProps<{ action: string; data: TActiveAgent }>): void => {
  socket.subscribe({
    id,
    callback,
    scope: `agent:activeAgentsUpdate`,
    eventName: `agent:activeAgentsUpdate`,
  })
}

export const activeAgentsSocket = {
  activeAgentsUpdate,
}
