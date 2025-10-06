import { useMount, useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'

import { useStore } from 'react-redux'
import { activeAgentsSocket } from '../../../api/socket/agent/active-agent'
import { socket } from '../../../api/socket/Socket'
import { TActiveAgent } from '../../../api/rest/agents/types'
import { setActiveAgents, setPagination } from '../../agents/store/agents'
import { agentActions } from '../../common/agentStatus/store'

export const useActiveAgentUpdates = (): void => {
  const { dispatch } = useRedux()
  const store = useStore()

  const findAndUpdateActiveAgent = (actions: string, data: TActiveAgent) => {
    const { activeAgents, pagination } = store.getState().agents

    const actionsMap: Record<string, (data: TActiveAgent) => TActiveAgent[]> = {
      update: (data: TActiveAgent) => {
        const { whisperSpy } = store.getState().agentStatus
        let found = false
        const updatedAgents = activeAgents.reduce(
          (acc: TActiveAgent[], agent: TActiveAgent) => {
            if (agent.id === data.id) {
              acc.push({
                ...agent,
                ...data,
              })
              found = true
            }

            if (whisperSpy && whisperSpy.agentId === data.id) {
              dispatch(agentActions.setWhisperSpyLeadId(data.leadId))
            }
            return acc
          },
          [],
        )
        if (!found) {
          updatedAgents.push(data)
        }
        return updatedAgents
      },
      remove: (data: TActiveAgent) =>
        activeAgents.filter((a: TActiveAgent) => a.id !== data.id),
    }

    if (!actionsMap[actions]) return
    const updatedData = actionsMap[actions](data)
    if (pagination.total !== updatedData.length) {
      dispatch(
        setPagination({
          ...pagination,
          total: updatedData.length,
          page:
            updatedData.length <= pagination.limit || 10 * (pagination.page || 1 - 1)
              ? updatedData.length / pagination.limit || 1
              : pagination.page,
        }),
      )
    }
    dispatch(setActiveAgents(updatedData))
  }

  const onSubscribeAgentUpdates = () =>
    activeAgentsSocket.activeAgentsUpdate({
      id: 'Subscribe active agent updates',
      callback: (e) => {
        findAndUpdateActiveAgent(e.action, e.data)
      },
    })

  const onUnsubscribeAgentUpdates = () => {
    socket.unsubscribe('Subscribe active agent updates')
  }

  useMount(() => {
    setTimeout(() => onSubscribeAgentUpdates(), 500)
  })

  useUnmount(() => {
    onUnsubscribeAgentUpdates()
  })
}
