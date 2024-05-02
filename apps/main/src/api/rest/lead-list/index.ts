import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TLeadListCatalogReq, TLeadListCatalogRes } from './types'

const getLeadListCatalog = (
  params: TLeadListCatalogReq,
): TAxiosResponse<TLeadListCatalogRes> => api.get('/lead-list', { params })

export const apiLeadList = {
  getLeadListCatalog,
}
