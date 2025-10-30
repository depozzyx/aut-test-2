import { TPaginatedRes } from '@/types/entities/pagination'
import { TLeadsGroup, TLeadsList } from '@/types/leads/leads-list'
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TImportReq,
  TImportLeadsRes,
  TLeadsListReq,
  TLeadsGroupReq,
  TCreateLeadGroupReq,
  TCreateLeadGroupRes,
  TLeadCustomStatusRes,
  TLeadStatusRes,
  TUpsertCustomStatusReq,
  TLeadRes,
  TUpdateLeadReq,
  TLeadOptionsRes,
  TImportCancelReq,
  TImportSubmitReq,
  TImportCheckReq,
  TImportCheckRes,
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
    timeout: 300_000,
  })

const importSubmitLeads = (body: TImportSubmitReq): TAxiosResponse<TImportLeadsRes> =>
  api.post('/leads/import-submit', body)

const importCheckLeads = (body: TImportCheckReq): TAxiosResponse<TImportCheckRes> =>
  api.post('/leads/import-check', body, {})

const importCancelLeads = (body: TImportCancelReq): TAxiosResponse<TImportLeadsRes> =>
  api.post('/leads/import-cancel', body)

const leadsList = (
  params: TLeadsListReq,
  controller?: AbortController,
): TAxiosResponse<TPaginatedRes<TLeadsList>> =>
  api.get('/leads', { params, signal: controller?.signal })

const leadsGroup = (params: TLeadsGroupReq): TAxiosResponse<TPaginatedRes<TLeadsGroup>> =>
  api.get('/lead-list', { params })

const createLeadGroup = (
  body: TCreateLeadGroupReq,
): TAxiosResponse<TCreateLeadGroupRes> => api.post('/lead-list', body)

const getStatuses = (): TAxiosResponse<TLeadStatusRes> => api.get('/leads/statuses')

const createCustomStatus = (
  body: TUpsertCustomStatusReq,
): TAxiosResponse<TLeadCustomStatusRes> => api.post('/leads/statuses/custom', body)

const updateCustomStatus = (
  id: number,
  body: TUpsertCustomStatusReq,
): TAxiosResponse<TLeadCustomStatusRes> => api.patch(`/leads/statuses/custom/${id}`, body)

const deleteCustomStatus = (id: number): TAxiosResponse<TLeadCustomStatusRes> =>
  api.delete(`/leads/statuses/custom/${id}`)

const getLead = (id: number): TAxiosResponse<TLeadRes> => api.get(`/leads/${id}`)

const getLeadsForSelect = (leadListId?: number): TAxiosResponse<TLeadOptionsRes> =>
  api.get(`/leads/options`, {
    params: leadListId ? { leadListId } : {},
  })

const updateLead = (id: number, body: TUpdateLeadReq): TAxiosResponse<TLeadRes> =>
  api.patch(`/leads/${id}`, body)

const deleteLead = (id: number): TAxiosResponse<TLeadCustomStatusRes> =>
  api.delete(`/leads/${id}`)

export const leadsApi = {
  importLeads,
  importSubmitLeads,
  importCancelLeads,
  leadsList,
  leadsGroup,
  createLeadGroup,
  getStatuses,
  createCustomStatus,
  updateCustomStatus,
  deleteCustomStatus,
  getLead,
  updateLead,
  deleteLead,
  getLeadsForSelect,
  importCheckLeads,
}
