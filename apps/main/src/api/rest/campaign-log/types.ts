import { TPagination } from '@/types/entities/pagination'
import { TOrderBy } from '@/types/entities/orderBy'
import { TCampaignStatus } from '@/features/campaigns/types'
import { TUserRoles } from '@/types/roles'
import { TLeadList } from '@/features/campaigns/hooks/use-getCampaignById'

type TEntityType = 'campaign'

export type TEntityAction = 'start' | 'stop' | 'call_initiated' | 'call_requeue'

export type TSortBy = 'id' | 'createdAt' | 'username' | 'role' | 'actionType'

export type TCampaignLogsReq = {
  orderBy?: TOrderBy
  userId?: number
  leadId?: number
  campaignId?: number
  entityType?: TEntityType
  entityAction?: TEntityAction
  search?: string
  sortBy?: TSortBy
  fromDate?: string
  toDate?: string
} & Omit<TPagination, 'total'>

export type TCampaign = {
  id: number
  name: string
  status: TCampaignStatus
  createdAt: string
}

export type TCLUser = {
  id: number
  email: string
  createdAt: string
  role: TUserRoles
  username: string
  workStatus: string
}

export type TCLLead = {
  id: number
  name: string
  phone: string
  timezone: string
  status: 'active' | 'inactive'
  source: string
  createdAt: string
  leadListId: number
  leadList: TLeadList
}

export type TDetails = {
  uuid: string
  online_agents: number
  auto_pause_agents: number
  manual_pause_agents: number
  calls_on_wait: number
  active_calls: number
  ws_registered_agents: number
  sip_registered_agents: number
  total_agents_count: number
  registred_agents: number
  offline_agents: number
  oncall_agents: number
  concurrent_call: number
}

export type TCampaignLogData = {
  actionType: TEntityAction
  campaign: TCampaign
  campaignId: number
  createdAt: string
  details: null | TDetails
  entityType: TEntityType
  id: number
  lead: null | TCLLead
  leadId: null
  pbxStatistics: null
  user: TCLUser
  userId: number
}

export type TCampaignLogsRes = {
  statusCode: number
  pagination: TPagination
  data: TCampaignLogData[]
}
