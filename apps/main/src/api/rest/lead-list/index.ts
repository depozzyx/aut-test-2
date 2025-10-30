import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TDeleteLeadListRes,
  TLeadCallStatusStatisticRes,
  TLeadListCatalogReq,
  TLeadListCatalogRes,
  TLeadListsReq,
  TLeadListsRes,
  TUpdateLeadListReq,
} from './types'

const getLeadListCatalog = (
  params: TLeadListCatalogReq,
): TAxiosResponse<TLeadListCatalogRes> => api.get('/lead-list', { params })

const getLeadLists = (
  params: TLeadListsReq,
  controller?: AbortController,
): TAxiosResponse<TLeadListsRes> =>
  api.get('/lead-list/list', { params, signal: controller?.signal })

const getLeadListCallStatistic = (
  id: number,
): TAxiosResponse<TLeadCallStatusStatisticRes> =>
  api.get(`/lead-list/${id}/calls-statistic`)

const updateLeadList = (
  id: number,
  payload: TUpdateLeadListReq,
): TAxiosResponse<TDeleteLeadListRes> => api.patch(`/lead-list/${id}`, payload)

const deleteLeadList = (id: number): TAxiosResponse<TDeleteLeadListRes> =>
  api.delete(`/lead-list/${id}`)

export const apiLeadList = {
  getLeadListCatalog,
  getLeadLists,
  getLeadListCallStatistic,
  updateLeadList,
  deleteLeadList,
}
