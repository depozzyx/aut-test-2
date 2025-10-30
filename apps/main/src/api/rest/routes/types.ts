import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TPagination } from '../../../types/entities/pagination'

export type TRoutesListReq = {
  name?: string
} & Pick<TPagination, 'page' | 'limit'>

export type TRoutesListRes = TRoutesResponse<TRoute[]> & {
  pagination: TPagination
}

export type TRoute = {
  id: number
  name: string
  callerNumber: string
}

export type TCreateRoute = {
  name: string
  callerNumber: string
}

export type TUpdateRoute = {
  name: string
  callerNumber: string
}

export type TCreateRouteRes = TRoutesResponse<TRoute>

export type TUpdateRouteRes = TRoutesResponse<TRoute>

export type TDeleteRouteRes = TRoutesResponse<never>

export type TRoutesResponse<T> = {
  statusCode: TGeneratedSuccessStatuses
  data: T
}
