import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TImportReq, TImportLeadsRes, TLeadsListReq, TLeadsListRes } from './types'

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

export const leadsApi = {
  importLeads,
  leadsList,
}
