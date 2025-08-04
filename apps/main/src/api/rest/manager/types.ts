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

export type TManager = {
  id: number
  email: string
  username: string
  pbxName: string
  hideLeadPhones: boolean
  createdAt: string
  campaigns: string[]
}

export type TManagersRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TManager[]
  pagination: TPagination
}

export type TCreateManagerReq = {
  email: string
  username: string
  password: string
  hideLeadPhones: string
}

export type TPostManagerReq = {
  email: string
  username: string
  password: string
  hideLeadPhones: boolean
}

export type TPostManagerRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TManager
}

export type TUpdateManager = {
  email?: string
  username: string
  password?: string | undefined
  managerId?: number
  hideLeadPhones?: string
}

export type TUpdateManagerReq = {
  email?: string
  username: string
  password?: string | undefined
  managerId?: number
  hideLeadPhones?: boolean
}

export type TUpdateManagerRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TManager
}

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

export type TDeleteManagerRes = TPostManagerRes
