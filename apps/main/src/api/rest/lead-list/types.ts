import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'
import { TCampaignStatus } from '@/features/campaigns/types'
import { TLeadListFilters } from '@/api-rest/leads/types'

export enum ELeadListOrderBy {
  ID = 'id',
  NAME = 'name',
  ACTIVE = 'active',
}

export type TLeadListCatalogReq = {
  order?: TOrder
} & Pick<TPagination, 'page' | 'limit'> & {
    withoutCampaigns?: boolean
    campaignId?: number | string | null
    name?: string
    ids?: number[]
  }

export type TLeadListsReq = {
  orderBy?: ELeadListOrderBy
  order?: TOrder
} & Pick<TPagination, 'page' | 'limit'> &
  TLeadListFilters

export type TLeadListCatalog = {
  id: number
  name: string
  leads: [null]
  createdAt: string
}

export type TLeadListCatalogRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadListCatalog[]
  pagination: TPagination
}

export type TLeadListData = {
  id: number
  name: string
  active: boolean
  campaignName: string
  campaignStatus: TCampaignStatus
  lastCallDate: string
  leadCount: number
}

export type TLeadListsRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    data: TLeadListData[]
    pagination: TPagination
  }
}

export type LeadCallStatusStatisticData = {
  status: string
  statusCode: string
  called: number
  notCalled: number
}

export type TLeadCallStatusStatisticRawData = {
  data: LeadCallStatusStatisticData[]
  subtotal: {
    called: number
    notCalled: number
  }
  total: number
}

export type TLeadCallStatusStatisticRes = {
  data: TLeadCallStatusStatisticRawData
  statusCode: TGeneratedSuccessStatuses
}

export type TDeleteLeadListRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TUpdateLeadListReq = {
  active?: boolean
  ids?: number[]
}
