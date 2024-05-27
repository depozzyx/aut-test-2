import { TPaginatedRes } from '@/types/entities/pagination'
import { TActivityLog } from '@/types/activity-logs'
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TActivityLogsReq, TExportLogsReq, TExportLogsRes } from './types'

const get = (params: TActivityLogsReq): TAxiosResponse<TPaginatedRes<TActivityLog>> =>
  api.get('/activity-logs', { params })

const exportCSV = (params: TExportLogsReq): TAxiosResponse<TExportLogsRes> =>
  api.get('/activity-logs/export/csv', { params })

const exportPDF = (params: TExportLogsReq): TAxiosResponse<TExportLogsRes> =>
  api.get('/activity-logs/export/pdf', { params })

export const activityLogApi = {
  get,
  exportCSV,
  exportPDF,
}
