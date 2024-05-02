import { TPaginatedRes } from '@/types/entities/pagination'
import { TActivityLog } from '@/types/activity-logs'
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TActivityLogsReq } from './types'

const get = (params: TActivityLogsReq): TAxiosResponse<TPaginatedRes<TActivityLog>> =>
  api.get('/activity-logs', { params })

export const activityLogApi = {
  get,
}
