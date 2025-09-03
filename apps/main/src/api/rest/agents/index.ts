import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TActiveAgentsRes,
  TAgentDashboardRes,
  TAgentsReq,
  TAgentStatus,
  TChangeWorkStatusReq,
  TChangeWorkStatusRes,
  TPbxAuthRes,
} from './types'

const pbxAuth = (): TAxiosResponse<TPbxAuthRes> => api.get('/agents/pbx-auth')

const changeWorkStatus = (
  data: TChangeWorkStatusReq,
): TAxiosResponse<TChangeWorkStatusRes> => api.put('/agents/work-status', data)

const hangup = (): TAxiosResponse<never> => api.put('/agents/hangup')

const getPBXAuth = (): TAxiosResponse<TPbxAuthRes> => api.get('/agents/pbx-auth')

const getActiveAgents = (params: TAgentsReq): TAxiosResponse<TActiveAgentsRes> =>
  api.get('/agents/dashboard', { params })

const getAgentDashboard = (): TAxiosResponse<TAgentDashboardRes> =>
  api.get(`/agents/current/dashboard`)

const getAgentStatus = (): TAxiosResponse<TAgentStatus> => api.get(`/agents/pbx/status`)

export const apiAgents = {
  pbxAuth,
  changeWorkStatus,
  hangup,
  getPBXAuth,
  getActiveAgents,
  getAgentDashboard,
  getAgentStatus,
}
