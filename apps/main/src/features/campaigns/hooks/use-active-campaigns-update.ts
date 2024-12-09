import { useMount, useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { setActiveCampaigns } from '@/features/campaigns/store/campaigns'
import { StatisticsTypeResponse, TActiveCampaign } from '@/features/campaigns/types'
import { useStore } from 'react-redux'
import { campaignSocket } from '../../../api/socket/campaign'
import { socket } from '../../../api/socket/Socket'

export const useCampaignUpdates = (): void => {
  const { dispatch } = useRedux()
  const store = useStore()

  const findAndUpdateCampaign = (
    campaignId: number,
    statistic: StatisticsTypeResponse,
  ) => {
    const { activeCampaigns } = store.getState().campaigns
    if (activeCampaigns.length) {
      const updatedData = activeCampaigns.map((campaign: TActiveCampaign) =>
        campaign.id === campaignId ? { ...campaign, statistic } : campaign,
      )
      dispatch(setActiveCampaigns(updatedData))
    }
  }

  const onSubscribeCampaignStatistic = () =>
    campaignSocket.campaignStatisticUpdate({
      id: 'Subscribe campaign statistic',
      callback: (e) => {
        findAndUpdateCampaign(e.campaignId, e.statistic)
      },
    })

  const onUnsubscribeAgentStatus = () => {
    socket.unsubscribe('Subscribe campaign statistic')
  }

  useMount(() => {
    setTimeout(() => onSubscribeCampaignStatistic(), 500)
  })

  useUnmount(() => {
    onUnsubscribeAgentStatus()
  })
}
