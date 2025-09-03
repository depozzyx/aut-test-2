import { TCampaignWSStatistic, TCampaignWSStatus } from '@/api-rest/campaigns/types'
import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

const campaignStatusUpdate = (
  {
    id,
    callback,
  }: TSubscribeProps<{ status: TCampaignWSStatus['data']; nearestTime?: string }>,
  campaignId: string,
): void => {
  socket.subscribe({
    id,
    callback,
    scope: `campaign:campaignStatusUpdate`,
    eventName: `campaign:campaignStatusUpdate`,
    campaignId,
  })
}

const campaignStatisticUpdate = ({
  id,
  callback,
}: TSubscribeProps<TCampaignWSStatistic['data']>): void => {
  socket.subscribe({
    id,
    callback,
    scope: `campaign:campaignStatisticUpdate`,
    eventName: `campaign:campaignStatisticUpdate`,
  })
}

export const campaignSocket = {
  campaignStatusUpdate,
  campaignStatisticUpdate,
}
