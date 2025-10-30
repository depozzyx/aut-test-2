import { useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { apiAgents } from '@/api-rest/agents'
import { setIsAgentOnline, setSelectedCampaignId } from '@/features/agents/store/agents'

import { agentActions, agentStatusSelector } from '../store'

export type TUseAgentStatus = {
  handleAgentOffline: () => void
}

export const useAgentStatus = (): TUseAgentStatus => {
  const { dispatch, select } = useRedux()

  const { checkCampaignId } = select(agentStatusSelector)

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await apiAgents.getAgentStatus()
      dispatch(agentActions.setPBXStatus(data.data))
      if (data.data.status === 'online') {
        dispatch(agentActions.setStatusAsync('finish'))
        dispatch(setSelectedCampaignId(null))
      }
    }
    checkStatus()
  }, [])

  useEffect(() => {
    if (checkCampaignId) {
      dispatch(agentActions.setCheckCampaignId(false))
    }
  }, [checkCampaignId])

  const handleAgentOffline = () => {
    dispatch(agentActions.setSipCanConnect(false))
    dispatch(setSelectedCampaignId(null))
    dispatch(setIsAgentOnline(false))
  }

  return {
    handleAgentOffline,
  }
}
