import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TAgentAnalyticsReqParams = {
  fromDate: string | Date
  toDate: string | Date
}

export type TAgentAnalytics = {
  successfulCalls: number
  unsuccessfulCalls: number
  undeterminedCalls: number
  conversionRate: number
  averageCallDuration: number
  availability: number
  callMinutes: number
  dateStatistic: string
}

export type TAgentAnalyticsData = {
  analytics: TAgentAnalytics
}

export type TAgentAnalyticsRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TAgentAnalyticsData[]
}
