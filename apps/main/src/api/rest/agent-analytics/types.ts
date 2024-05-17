import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TAgentAnalyticsReqParams = {
  fromDate: string | Date
  toDate: string | Date
}

export type TAgentAnalyticsData = {
  conversionRate: number
  availability: number
  averageCallDuration: number
  callMinutes: number
  successfulCalls: number
  unsuccessfulCalls: number
  undeterminedCalls: number
}

export type TAgentAnalyticsRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TAgentAnalyticsData
}
