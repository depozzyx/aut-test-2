import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'

export type TManagerOrderBy =
  | 'createdAt'
  | 'workStatus'
  | 'username'
  | 'id'
  | 'pbxName'
  | 'email'

export type TManagersReq = {
  orderBy?: TManagerOrderBy
  order?: TOrder
  search?: string
} & Pick<TPagination, 'page' | 'limit'>

export type TApiKey = {
  id: number
  key: string
  createdAt: string
}

export type TApiKeyRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TApiKey
}

export type TApiKeysListRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TApiKey[]
  pagination: TPagination
}
