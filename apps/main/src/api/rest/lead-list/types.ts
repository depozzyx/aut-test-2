import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'

export type TLeadListCatalogReq = {
  orderBy: TOrderBy
} & Pick<TPagination, 'page' | 'limit'> & {
    withoutCampaigns?: boolean
    campaignId?: number | string | null
  }

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
