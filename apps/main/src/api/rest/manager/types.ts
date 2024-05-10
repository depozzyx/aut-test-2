import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'

export type TUpdateManagerReq = {
  username: string
}

export type TUpdateManagerRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    id: number
    email: string
    username: string
  }
}

export type TManagersReq = {
  orderBy: TOrderBy
} & Pick<TPagination, 'page' | 'limit'>

export type TManagersRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    id: number
    email: string
    username: string
    pbxName: string
    campaigns: string[]
  }[]
  pagination: TPagination
}
