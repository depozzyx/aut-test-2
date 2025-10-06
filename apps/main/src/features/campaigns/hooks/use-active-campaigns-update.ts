import { useMount, useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import {
  refetch,
  setActiveCampaigns,
  setCampaignList,
} from '@/features/campaigns/store/campaigns'
import {
  StatisticsTypeResponse,
  TActiveCampaign,
  TCampaign,
} from '@/features/campaigns/types'
import { useStore } from 'react-redux'
import { campaignSocket } from '../../../api/socket/campaign'
import { socket } from '../../../api/socket/Socket'
import { notificationActions } from '../../common/notifications/store'

export const useCampaignUpdates = (): void => {
  const { dispatch } = useRedux()
  const store = useStore()

  const findAndUpdateCampaign = (
    campaignId: number,
    data: StatisticsTypeResponse | string,
  ) => {
    const { activeCampaigns, campaignList } = store.getState().campaigns
    const source = typeof data === 'string' ? campaignList : activeCampaigns

    const field =
      typeof data === 'string'
        ? {
            status: data,
            requestedStatus: null,
          }
        : {
            statistic: data,
          }
    const method = typeof data === 'string' ? setCampaignList : setActiveCampaigns
    const mapper = (campaign: TActiveCampaign) => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          ...field,
        }
      }
      return campaign
    }
    if (typeof data === 'string') {
      if (campaignList.find((c: TCampaign) => c.id === campaignId)) {
        dispatch(
          notificationActions.setNotification({
            key: `notifications:campaign.${data}`,
            status: 'success',
            values: {
              campaignName: campaignList.find((c: TCampaign) => c.id === campaignId)
                ?.name,
            },
          }),
        )
      }
      dispatch(refetch())
    }
    const updatedData = source.map(mapper)
    dispatch(method(updatedData))
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
