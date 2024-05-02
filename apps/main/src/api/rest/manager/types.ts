import { TGeneratedSuccessStatuses } from '@/constants/success-status'
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
  orderBy: 'ASC' | 'DESC'
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
