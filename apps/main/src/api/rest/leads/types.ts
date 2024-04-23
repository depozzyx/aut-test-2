import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsList } from '@/types/leads/leads-list'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TLeadsListReq = {
  orderBy: 'ASC' | 'DESC'
} & Pick<TPagination, 'page' | 'limit'>

export type TLeadsListRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsList[]
  pagination: TPagination
}
