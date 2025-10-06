import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import { CampaignStatisticReq, CampaignStatisticRes } from './types'

const campaignStatistics = (
  params: CampaignStatisticReq,
): TAxiosResponse<CampaignStatisticRes> => api.post('/report/campaign-statistics', params)

const campaignStatisticsDownload = async (
  params: CampaignStatisticReq & { format: 'xlsx' | 'csv' },
): Promise<string> => {
  const response = await api.post('/report/campaign-statistics/download', params, {
    responseType: 'blob',
  })
  return URL.createObjectURL(response.data)
}

export const apiReports = {
  campaignStatistics,
  campaignStatisticsDownload,
}
