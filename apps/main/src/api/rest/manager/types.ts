import { TGeneratedSuccessStatuses } from '@/constants/success-status'

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
