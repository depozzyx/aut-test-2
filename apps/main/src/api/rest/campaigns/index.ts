/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  ECampaignDeleteOptions,
  TActiveCampaignsReq,
  TActiveCampaignsRes,
  TCampaignInfoRes,
  TCampaignListReq,
  TCreateCampaignReq,
  TEditCampaignReq,
} from './types'

const getActiveCampaigns = (
  params: TActiveCampaignsReq,
): TAxiosResponse<TActiveCampaignsRes> => api.get('/campaign/dashboard', { params })

const getCampaignList = (params: TCampaignListReq): TAxiosResponse<TActiveCampaignsRes> =>
  api.get('/campaign', { params })

const editCampaign = (data: TEditCampaignReq): TAxiosResponse<any> =>
  api.put('/campaign', data)

const deleteCampaign = (
  id: number,
  deleteOptions: ECampaignDeleteOptions,
): TAxiosResponse<any> => api.delete(`/campaign/${id}`, { params: { deleteOptions } })

const createCampaign = (data: TCreateCampaignReq): TAxiosResponse<any> =>
  api.post('/campaign', data)

const getCampaignById = (id: string): TAxiosResponse<any> => api.get(`/campaign/${id}`)

const getCampaignInfoById = (id: number): TAxiosResponse<TCampaignInfoRes> =>
  api.get(`/campaign/${id}/info`)

const getCampaignStatusById = (id: string): TAxiosResponse<any> =>
  api.get(`/campaign/${id}/status`)

const getAgentAssignedActiveCampaigns = (): Promise<TAxiosResponse<any>> =>
  api.get('/campaign/agent-assigned')

const stopCampaign = (data: { id: string }): TAxiosResponse<any> =>
  api.post('/campaign/stop', data)

const startCampaign = (data: { id: string }): TAxiosResponse<any> =>
  api.post('/campaign/start', data)

const start = (id: number): TAxiosResponse<any> => api.post(`/campaign/${id}/start`)

const stop = (id: number): TAxiosResponse<any> => api.post(`/campaign/${id}/stop`)

export const apiCampaigns = {
  getActiveCampaigns,
  getCampaignList,
  deleteCampaign,
  getCampaignById,
  getCampaignInfoById,
  getCampaignStatusById,
  getAgentAssignedActiveCampaigns,
  stopCampaign,
  startCampaign,
  createCampaign,
  editCampaign,
  start,
  stop,
}
