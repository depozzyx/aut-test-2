import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'

export type TAdminsOrderBy = 'createdAt' | 'username' | 'id' | 'email' | 'pbxName'

export type TAdminsReq = {
  orderBy?: TAdminsOrderBy
  order?: TOrder
} & Pick<TPagination, 'page' | 'limit'>

export type TAdmin = {
  id: number
  email: string
  username: string
  pbxName: string
  createdAt: string
}

export type TAdminsListRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TAdmin[]
  pagination: TPagination
}

export type TCreateAdminReq = {
  email: string
  username: string
  password: string
}

export type TAdminRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TAdmin
}

export type TUpdateAdmin = {
  id?: number
  email?: string
  username?: string
  password?: string | undefined
}
