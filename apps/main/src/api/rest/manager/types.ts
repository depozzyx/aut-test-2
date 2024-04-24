import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TUpdateManagerReq = {
  name: string
}

export type TUpdateManagerRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    id: number
    email: string
    name: string
  }
}
