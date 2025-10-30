import { useMount, useUnmount } from 'react-use'
import { useStore } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { refetch, setCampaignList } from '@/features/campaigns/store/campaigns'
import { TActiveCampaign, TCampaign } from '@/features/campaigns/types'
import { TCampaignWSStatus } from '@/api-rest/campaigns/types'
import { campaignSocket } from '../../../api/socket/campaign'
import { socket } from '../../../api/socket/Socket'
import { notificationActions } from '../../common/notifications/store'

export const useCampaignUpdates = (): void => {
  const { dispatch } = useRedux()
  const store = useStore()

  const findAndUpdateCampaign = (campaignId: number, data: TCampaignWSStatus) => {
    const { campaignList } = store.getState().campaigns
    const source = campaignList

    const field = {
      status: data.data,
      requestedStatus: null,
      nearestTime: data.nearestTime,
    }

    const updatedData = source.map((campaign: TActiveCampaign) => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          ...field,
        }
      }
      return campaign
    })

    dispatch(setCampaignList({ data: updatedData }))

    dispatch(refetch())

    if (campaignList.find((c: TCampaign) => c.id === campaignId)) {
      dispatch(
        notificationActions.setNotification({
          key: `notifications:campaign.${data.data}`,
          status: 'success',
          values: {
            campaignName: campaignList.find((c: TCampaign) => c.id === campaignId)?.name,
          },
        }),
      )
    }
  }

  const onSubscribeCampaignStatus = () =>
    campaignSocket.campaignChangesUpdate({
      id: 'Subscribe campaign status',
      callback: (e) => {
        findAndUpdateCampaign(e.campaignId, { data: e.data, nearestTime: e.nearestTime })
      },
    })

  const onUnsubscribeCampaignStatus = () => {
    socket.unsubscribe('Subscribe campaign status')
  }

  useMount(() => {
    setTimeout(() => onSubscribeCampaignStatus(), 500)
  })

  useUnmount(() => {
    onUnsubscribeCampaignStatus()
  })
}
