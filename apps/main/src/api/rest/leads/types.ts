import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup } from '@/types/leads/leads-list'
import { TCampaignStatus } from '@/features/campaigns/types'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export enum ELeadsOrderBy {
  CREATED_AT = 'createdAt',
  ID = 'id',
  NAME = 'name',
  ACTIVE = 'active',
  TIMEZONE = 'timezone',
  STATUS = 'status',
  PHONE = 'phone',
  SOURCE = 'source',
  FEEDBACK_STATUS = 'feedbackStatus',
  CAMPAIGN = 'campaign',
  LEAD_LIST = 'leadList',
}

export type TLeadFilters = {
  id?: number
  name?: string
  phone?: string
  status?: string
  campaignId?: number
}

export type TLeadListFilters = {
  id?: number
  name?: string
  campaignId?: number
  campaignStatus?: string
}

export type TLeadsListReq = {
  orderBy?: ELeadsOrderBy
  order?: TOrder
  leadListId?: number
} & Pick<TPagination, 'page' | 'limit'> &
  TLeadFilters

export type TLeadsGroupReq = {
  order?: TOrder
} & Pick<TPagination, 'page' | 'limit'>

export type TCreateLeadGroupPayload = {
  name: string
  active: string
}

export type TCreateLeadGroupReq = {
  name: string
  active: boolean
}

export type TCreateLeadGroupRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsGroup
}

export type TLeadCustomStatusRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TLeadStatusData = {
  id?: number
  name: string
  value: string
  isSystem?: boolean
  feedbackDisabled?: boolean
}

export type TLeadStatusRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadStatusData[]
}

export type TUpsertCustomStatusReq = {
  name: string
  value: string
}

export type TLeadStatusLog = {
  id: number
  createdAt: string
  details: Record<string, Record<string, string>>
  user: { username: string }
}

export type TLeadData = {
  id: number
  name: string
  phone: string
  timezone: string
  status: string
  source: string
  leadListId?: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  leadList: {
    id: number
    name: string
    campaign: {
      id: number
      name: string
      status: TCampaignStatus
    }
  }
  countryCode: string
  lastCallAt: string
  logs: TLeadStatusLog[]
  leadData?: TLeadData
}

export type TUpdateLeadReq = {
  name?: string
  status?: string
  timezone?: string
}

export type TLeadRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadData
}

export type TLeadOption = {
  label: string
  value: number
}

export type TLeadOptionsRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadOption[]
}
