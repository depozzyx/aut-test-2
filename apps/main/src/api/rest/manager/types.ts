import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'

export type TManagersReq = {
  orderBy: TOrderBy
} & Pick<TPagination, 'page' | 'limit'>

export type TManager = {
  id: number
  email: string
  username: string
  pbxName: string
  campaigns: string[]
}

export type TManagersRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TManager[]
  pagination: TPagination
}

export type TPostManagerReq = {
  email: string
  username: string
  password: string
}

export type TPostManagerRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TManager
}

export type TUpdateManagerReq = {
  username: string
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
