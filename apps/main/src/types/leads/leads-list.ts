import { TLeadList } from '@/features/campaigns/hooks/use-getCampaignById'

export type TLeadListStatus = 'active' | 'inactive' | 'successful' | 'unsuccessful'

export type TLeadsList = {
  id: number
  name: string
  timezone: string
  status: 'active' | 'inactive'
  feedbackStatus?: 'successful' | 'unsuccessful'
  phone: string
  source: string
  leadList: TLeadList
}

export type TLeadsGroup = {
  id: number
  name: string
}
