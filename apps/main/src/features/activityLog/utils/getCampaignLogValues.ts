import { TCampaignLogData } from '@/api-rest/campaign-log/types'

export const getCampaignLogValues = ({
  actionType,
  user,
  campaign,
  lead,
}: TCampaignLogData): {
  value1: string
  value2?: string
  value3?: string
  value4?: string
} => {
  switch (actionType) {
    case 'start':
    case 'stop':
      return {
        value1: user?.username || 'user',
        value2: campaign?.name || 'campaign',
      }
    case 'call_initiated':
      return {
        value1: user?.username || 'user',
        value2: campaign?.name || 'campaign',
        value3: lead?.name || 'lead',
        value4: lead?.phone || 'phone',
      }
    case 'call_requeue':
      return {
        value1: campaign?.name || 'campaign',
        value2: lead?.name || 'lead',
        value3: lead?.phone || 'phone',
      }
    default:
      return {
        value1: '',
        value2: '',
      }
  }
}
