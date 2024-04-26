import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup, TLeadsList } from '@/types/leads/leads-list'

export type TImportReq = FormData

export type TImportLeadsRes = {
  statusCode: TGeneratedSuccessStatuses
}

export type TLeadsListReq = {
  orderBy: 'ASC' | 'DESC'
  leadListId?: number
} & Pick<TPagination, 'page' | 'limit'>

export type TLeadsListRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsList[]
  pagination: TPagination
}

export type TLeadsGroupReq = {
  orderBy: 'ASC' | 'DESC'
} & Pick<TPagination, 'page' | 'limit'>

export type TCreateLeadGroupReq = {
  name: string
}

export type TLeadsGroupRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsGroup[]
  pagination: TPagination
}

export type TCreateLeadGroupRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLeadsGroup
  pagination: TPagination
}
