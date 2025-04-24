import { useMount, useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { setActiveCampaigns, setCampaignList } from '@/features/campaigns/store/campaigns'
import { StatisticsTypeResponse, TActiveCampaign } from '@/features/campaigns/types'
import { useStore } from 'react-redux'
import { campaignSocket } from '../../../api/socket/campaign'
import { socket } from '../../../api/socket/Socket'

export const useCampaignUpdates = (): void => {
  const { dispatch } = useRedux()
  const store = useStore()

  const findAndUpdateCampaign = (
    campaignId: number,
    data: StatisticsTypeResponse | string,
  ) => {
    const { activeCampaigns, campaignList } = store.getState().campaigns
    const source = typeof data === 'string' ? campaignList : activeCampaigns

    if (source.length) {
      const field = typeof data === 'string' ? 'status' : 'statistic'
      const method = typeof data === 'string' ? setCampaignList : setActiveCampaigns
      const mapper = (campaign: TActiveCampaign) => {
        if (campaign.id === campaignId) {
          return {
            ...campaign,
            [field]: data,
          }
        }
        return campaign
      }

      const updatedData = source.map(mapper)
      dispatch(method(updatedData))
    }
  }

  const onSubscribeCampaignStatistic = () =>
    campaignSocket.campaignStatisticUpdate({
      id: 'Subscribe campaign statistic',
      callback: (e) => {
        findAndUpdateCampaign(e.campaignId, e.data)
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
