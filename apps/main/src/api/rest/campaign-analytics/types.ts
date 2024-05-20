import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TCampaignAnalyticsReqParams = {
  fromDate: string | Date
  toDate: string | Date
}

export type TCampaignAnalyticsData = {
  averageCallDuration: number
  conversionRate: number
  callAnswerRate: number
  dateStatistic: string
}

export type TCampaignAnalytics = {
  analytics: TCampaignAnalyticsData
}

export type TCampaignAnalyticsRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TCampaignAnalytics[]
}
