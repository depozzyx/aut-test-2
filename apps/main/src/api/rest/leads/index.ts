import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TImportReq,
  TImportLeadsRes,
  TLeadsListReq,
  TLeadsListRes,
  TLeadsGroupRes,
  TLeadsGroupReq,
  TCreateLeadGroupReq,
  TCreateLeadGroupRes,
} from './types'

const importLeads = (
  body: TImportReq,
  controller: AbortController,
): TAxiosResponse<TImportLeadsRes> =>
  api.post('/leads/import', body, {
    signal: controller.signal,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const leadsList = (params: TLeadsListReq): TAxiosResponse<TLeadsListRes> =>
  api.get('/leads', { params })

const leadsGroup = (params: TLeadsGroupReq): TAxiosResponse<TLeadsGroupRes> =>
  api.get('/lead-list', { params })

const createLeadGroup = (
  body: TCreateLeadGroupReq,
): TAxiosResponse<TCreateLeadGroupRes> => api.post('/lead-list', body)

export const leadsApi = {
  importLeads,
  leadsList,
  leadsGroup,
  createLeadGroup,
}
