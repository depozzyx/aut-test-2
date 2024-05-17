import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TAgentAnalyticsReqParams, TAgentAnalyticsRes } from './types'

const getAgentAnalytics = (
  id: number,
  params: TAgentAnalyticsReqParams,
): TAxiosResponse<TAgentAnalyticsRes> => api.get(`/analytics/agent/${id}`, { params })

export const apiAgentAnalytics = {
  getAgentAnalytics,
}
