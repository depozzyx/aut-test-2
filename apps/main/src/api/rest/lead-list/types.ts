import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import { TCampaignStatus } from '@/features/campaigns/types'
import { ELeadsSortBy } from '@/api-rest/leads/types'

export type TLeadListCatalogReq = {
  orderBy: TOrderBy
} & Pick<TPagination, 'page' | 'limit'> & {
    withoutCampaigns?: boolean
    campaignId?: number | string | null
  }

export type TLeadListsReq = {
  orderBy: TOrderBy
  sortBy?: ELeadsSortBy
} & Pick<TPagination, 'page' | 'limit'>

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

export type TLeadListItemData = {
  id: number
}

export type TLeadListRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadListItemData
}

export type TDeleteLeadListRes = {
  statusCode: TGeneratedSuccessStatuses
}
