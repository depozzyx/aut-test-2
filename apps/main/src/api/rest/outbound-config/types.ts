import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TOutboundConfigListReq = {
  campaignId?: number | string | null
}

export type TOutboundConfigListRes = TOutboundConfigResponse<TOutboundConfig[]>

export type TOutboundConfig = {
  id: number
  campaignId: number
  prefix: string
  route: {
    id: number
    name: string
  }
  active: boolean
}

export type TCreateOutboundConfig = {
  campaignId: number
  prefix: string
  routeId: number
  active: boolean
}

export type TUpdateOutboundConfig = {
  prefix: string
  routeId: number
  active: boolean
}

export type TCreateOutboundConfigRes = TOutboundConfigResponse<TOutboundConfig>

export type TUpdateOutboundConfigRes = TOutboundConfigResponse<TOutboundConfig>

export type TDeleteOutboundConfigRes = TOutboundConfigResponse<never>

export type TOutboundConfigResponse<T> = {
  statusCode: TGeneratedSuccessStatuses
  data: T
}
