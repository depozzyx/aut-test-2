import { TAxiosResponse } from '@/api-rest/types'
import { api } from '@/api-rest/instance'
import { TCampaignLogsReq, TCampaignLogsRes } from '@/api-rest/campaign-log/types'

const getCampaignLogsById = (id: number): TAxiosResponse<TCampaignLogsRes> =>
  api.get(`/campaign-logs/${id}`)

const getCampaignLogs = (params: TCampaignLogsReq): TAxiosResponse<TCampaignLogsRes> =>
  api.get('/campaign-logs', { params })

export const campaignLogsApi = {
  getCampaignLogsById,
  getCampaignLogs,
}
