import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup } from '@/types/leads/leads-list'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TLeadsListReq = {
  orderBy: TOrderBy
  leadListId?: number
} & Pick<TPagination, 'page' | 'limit'>

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
