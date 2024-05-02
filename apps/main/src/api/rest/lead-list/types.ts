import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination } from '@/types/entities/pagination'

export type TLeadListCatalogReq = {
  orderBy: 'ASC' | 'DESC'
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
