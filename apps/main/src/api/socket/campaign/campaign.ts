import { TCampaignWSStatus } from '@/api-rest/campaigns/types'
import { socket } from '../Socket'
import { TSubscribeProps } from '../types'

const campaignStatusUpdate = (
  { id, callback }: TSubscribeProps<{ status: TCampaignWSStatus['data'] }>,
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

export const campaignSocket = {
  campaignStatusUpdate,
}
