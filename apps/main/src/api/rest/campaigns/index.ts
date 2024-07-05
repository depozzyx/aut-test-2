/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TActiveCampaignsReq,
  TActiveCampaignsRes,
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

const deleteCampaign = (id: number): TAxiosResponse<any> => api.delete(`/campaign/${id}`)

const createCampaign = (data: TCreateCampaignReq): TAxiosResponse<any> =>
  api.post('/campaign', data)

const getCampaignById = (id: string): TAxiosResponse<any> => api.get(`/campaign/${id}`)

const stopCampaign = (data: { id: string }): TAxiosResponse<any> =>
  api.post('/campaign/stop', data)

const startCampaign = (data: { id: string; debugging?: boolean }): TAxiosResponse<any> =>
  api.post('/campaign/start', data)

export const apiCampaigns = {
  getActiveCampaigns,
  getCampaignList,
  deleteCampaign,
  getCampaignById,
  stopCampaign,
  startCampaign,
  createCampaign,
  editCampaign,
}
