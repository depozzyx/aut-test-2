import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TActiveAgentsRes,
  TAgentByIdRes,
  TAgentDashboardRes,
  TAgentsListRes,
  TAgentsReq,
  TAgentStatus,
  TChangeWorkStatusReq,
  TChangeWorkStatusRes,
  TCreateAgentReq,
  TCreateAgentRes,
  TDeleteAgentRes,
  TPbxAuthRes,
  TUpdateAgentReq,
  TUpdateAgentRes,
} from './types'

const pbxAuth = (): TAxiosResponse<TPbxAuthRes> => api.get('/agents/pbx-auth')

const changeWorkStatus = (
  data: TChangeWorkStatusReq,
): TAxiosResponse<TChangeWorkStatusRes> => api.put('/agents/work-status', data)

const hangup = (): TAxiosResponse<never> => api.put('/agents/hangup')

const createAgent = (data: TCreateAgentReq): TAxiosResponse<TCreateAgentRes> =>
  api.post('/agents', data)

const getAgentsList = (params: TAgentsReq): TAxiosResponse<TAgentsListRes> =>
  api.get('/agents', { params })

const getPBXAuth = (): TAxiosResponse<TPbxAuthRes> => api.get('/agents/pbx-auth')

const updateAgent = (data: TUpdateAgentReq): TAxiosResponse<TUpdateAgentRes> =>
  api.put('/agents', data)

const getActiveAgents = (params: TAgentsReq): TAxiosResponse<TActiveAgentsRes> =>
  api.get('/agents/dashboard', { params })

const getAgentDashboard = (): TAxiosResponse<TAgentDashboardRes> =>
  api.get(`/agents/current/dashboard`)

const getAgentById = (id: number): TAxiosResponse<TAgentByIdRes> =>
  api.get(`/agents/${id}`)

const deleteAgent = (id: number): TAxiosResponse<TDeleteAgentRes> =>
  api.delete(`/agents/${id}`)

const getAgentStatus = (): TAxiosResponse<TAgentStatus> => api.get(`/agents/pbx/status`)

export const apiAgents = {
  pbxAuth,
  changeWorkStatus,
  hangup,
  createAgent,
  getAgentsList,
  getPBXAuth,
  updateAgent,
  getActiveAgents,
  getAgentDashboard,
  getAgentById,
  deleteAgent,
  getAgentStatus,
}
