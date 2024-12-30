import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TDeleteLeadListRes,
  TLeadListCatalogReq,
  TLeadListCatalogRes,
  TLeadListRes,
  TLeadListsReq,
  TLeadListsRes,
} from './types'

const getLeadListCatalog = (
  params: TLeadListCatalogReq,
): TAxiosResponse<TLeadListCatalogRes> => api.get('/lead-list', { params })

const getLeadLists = (params: TLeadListsReq): TAxiosResponse<TLeadListsRes> =>
  api.get('/lead-list/list', { params })

const getLeadList = (id: number): TAxiosResponse<TLeadListRes> =>
  api.get(`/lead-list/${id}`)

const updateLeadList = (id: number): TAxiosResponse<TLeadListRes> =>
  api.patch(`/lead-list/${id}`)

const deleteLeadList = (id: number): TAxiosResponse<TDeleteLeadListRes> =>
  api.delete(`/lead-list/${id}`)

export const apiLeadList = {
  getLeadListCatalog,
  getLeadLists,
  getLeadList,
  updateLeadList,
  deleteLeadList,
}
