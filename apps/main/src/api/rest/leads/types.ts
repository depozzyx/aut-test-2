import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup } from '@/types/leads/leads-list'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TLeadsListReq = {
  orderBy: 'ASC' | 'DESC'
  leadListId?: number
} & Pick<TPagination, 'page' | 'limit'>

export type TLeadsGroupReq = {
  orderBy: 'ASC' | 'DESC'
} & Pick<TPagination, 'page' | 'limit'>

export type TCreateLeadGroupReq = {
  name: string
}

export type TCreateLeadGroupRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsGroup
}
