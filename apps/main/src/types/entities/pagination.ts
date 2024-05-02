import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TPagination = {
  page: number
  limit?: number
  total: number
}

export type TPaginatedRes<T> = {
  statusCode: TGeneratedSuccessStatuses
  data: T[]
  pagination: TPagination
}
