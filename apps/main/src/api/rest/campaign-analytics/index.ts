import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TCampaignAnalyticsReqParams, TCampaignAnalyticsRes } from './types'

const getCampaignAnalytics = (
  id: number,
  params: TCampaignAnalyticsReqParams,
): TAxiosResponse<TCampaignAnalyticsRes> =>
  api.get(`/analytics/campaign/${id}`, { params })

export const apiCampaignAnalytics = {
  getCampaignAnalytics,
}
