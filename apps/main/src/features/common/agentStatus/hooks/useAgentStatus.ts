import { useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
// import { useAuth } from '@/features/common/user'
import { apiAgents } from '@/api-rest/agents'
import { setIsAgentOnline, setSelectedCampaignId } from '@/features/agents/store/agents'
// import { useSIPService } from '@/features/calls/hooks/useSIPService'
// import { useCampaigns } from '@/features/campaigns/hooks/useCampaigns'
import { agentActions, agentStatusSelector } from '../store'

export type TUseAgentStatus = {
  handleAgentOffline: () => void
}

export const useAgentStatus = (): TUseAgentStatus => {
  const { dispatch, select } = useRedux()
  // const { user } = useAuth()
  // const { pbxStatus } = select(agentStatusSelector)
  // const { connect, keepAlive, disconnect, ua } = useSIPService()
  const { checkCampaignId } = select(agentStatusSelector)
  // const { setCampaignId, checkCampaigns } = useCampaigns()

  // useEffect(() => {
  //   if (user?.workStatus) {
  //     dispatch(agentActions.setStatus(user?.workStatus))
  //   }
  // }, [user])

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
      // setCampaignId(true).then((id: number | null) => {
      //   if (id) {
      //     dispatch(agentActions.setStatusAsync('start'))
      //   }
      //   dispatch(setIsAgentOnline(!!id))
      // })
    }
  }, [checkCampaignId])

  // useEffect(() => {
  //   if (pbxStatus.status === 'online' && !ua?.isConnected()) {
  //     connect()
  //     keepAlive()
  //   }
  // }, [pbxStatus.status, ua])

  useEffect(() => {
    // checkCampaigns()
  }, [])

  const handleAgentOffline = () => {
    dispatch(agentActions.setSipCanConnect(false))
    dispatch(setSelectedCampaignId(null))
    dispatch(setIsAgentOnline(false))
    // disconnect()
  }

  return {
    handleAgentOffline,
  }
}
