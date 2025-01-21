import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup } from '@/types/leads/leads-list'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export enum ELeadsSortBy {
  CREATED_AT = 'createdAt',
  ID = 'id',
  NAME = 'name',
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
  campaignName?: string
}

export type TLeadListFilters = {
  id?: number
  name?: string
  campaignName?: string
  campaignStatus?: string
}

export type TLeadsListReq = {
  orderBy: TOrderBy
  leadListId?: number
  sortBy?: ELeadsSortBy
} & Pick<TPagination, 'page' | 'limit'> &
  TLeadFilters

export type TLeadsGroupReq = {
  orderBy: TOrderBy
} & Pick<TPagination, 'page' | 'limit'>

export type TCreateLeadGroupReq = {
  name: string
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
