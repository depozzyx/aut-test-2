import { TLeadList } from '../../api/rest/campaigns/types'

export type TLeadListStatus = 'active' | 'inactive'

export type TLeadsList = {
  id: number
  name: string
  timezone: string
  status: 'active' | 'inactive'
  feedbackStatus?: 'successful' | 'unsuccessful'
  phone: string
  country: string
  source: string
  leadList: TLeadList
}

export type TLeadsGroup = {
  id: number
  name: string
}
