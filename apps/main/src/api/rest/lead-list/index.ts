import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TDeleteLeadListRes,
  TLeadCallStatusStatisticRes,
  TLeadListCatalogReq,
  TLeadListCatalogRes,
  TLeadListsReq,
  TLeadListsRes,
} from './types'

const getLeadListCatalog = (
  params: TLeadListCatalogReq,
): TAxiosResponse<TLeadListCatalogRes> => api.get('/lead-list', { params })

const getLeadLists = (params: TLeadListsReq): TAxiosResponse<TLeadListsRes> =>
  api.get('/lead-list/list', { params })

const getLeadListCallStatistic = (
  id: number,
): TAxiosResponse<TLeadCallStatusStatisticRes> =>
  api.get(`/lead-list/${id}/calls-statistic`)

const updateLeadList = (id: number, ids: number[]): TAxiosResponse<TDeleteLeadListRes> =>
  api.patch(`/lead-list/${id}`, {
    ids,
  })

const deleteLeadList = (id: number): TAxiosResponse<TDeleteLeadListRes> =>
  api.delete(`/lead-list/${id}`)

export const apiLeadList = {
  getLeadListCatalog,
  getLeadLists,
  getLeadListCallStatistic,
  updateLeadList,
  deleteLeadList,
}
