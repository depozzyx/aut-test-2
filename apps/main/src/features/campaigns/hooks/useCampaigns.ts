import { useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { setSelectedCampaignId, setIsAgentOnline } from '@/features/agents/store/agents'
import { agentActions } from '@/features/common/agentStatus/store'
import { TAgentAssignedCampaign } from '@/features/campaigns/types'
import {
  asyncGetAgentAssignedCampaigns,
  selectAgentAssignedCampaigns,
  setIsCampaignSelected,
} from '../store/campaigns'

export type TUseCampaigns = {
  agentAssignedCampaigns: TAgentAssignedCampaign[]
  setCampaignId: (createCallback?: boolean) => Promise<number | null>
  handleCampaignSelected: (campaignId: string) => void
  checkCampaigns: () => void
}

export const useCampaigns = (): TUseCampaigns => {
  const { dispatch, select } = useRedux()
  const agentAssignedCampaigns = select(selectAgentAssignedCampaigns)

  useEffect(() => {
    dispatch(asyncGetAgentAssignedCampaigns())
  }, [])

  const setCampaignId = async (): Promise<number | null> => {
    if (agentAssignedCampaigns.length === 0) {
      dispatch(setIsCampaignSelected(false))
      return null
    }
    if (agentAssignedCampaigns.length === 1) {
      const campaignId = agentAssignedCampaigns[0].id
      if (campaignId) {
        dispatch(setSelectedCampaignId(String(campaignId)))
        dispatch(setIsCampaignSelected(true))
        return campaignId
      }
    } else {
      dispatch(setIsCampaignSelected(false))
    }
    return null
  }

  const handleCampaignSelected = (campaignId: string) => {
    dispatch(setSelectedCampaignId(campaignId))
    dispatch(agentActions.setSipCanConnect(true))
    dispatch(agentActions.setStatusAsync('start'))
    dispatch(setIsCampaignSelected(true))
    dispatch(setIsAgentOnline(true))
  }

  const checkCampaigns = () => {
    if (agentAssignedCampaigns.length === 1) {
      const campaignId = agentAssignedCampaigns[0].id
      if (campaignId) {
        dispatch(setSelectedCampaignId(String(campaignId)))
        dispatch(setIsCampaignSelected(true))
        dispatch(setIsAgentOnline(true))
      }
    } else {
      dispatch(setIsCampaignSelected(false))
      dispatch(setIsAgentOnline(false))
    }
  }

  return {
    agentAssignedCampaigns,
    setCampaignId,
    handleCampaignSelected,
    checkCampaigns,
  }
}
