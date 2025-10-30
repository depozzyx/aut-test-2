import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TAgentGroupRes,
  TAgentGroupsReq,
  TAgentGroupsRes,
  TCreateAgentGroupReq,
  TUpdateAgentGroupReq,
} from './groups.types'

const createGroup = (body: TCreateAgentGroupReq): TAxiosResponse<TAgentGroupRes> =>
  api.post('/groups', body)

const getGroups = (params: TAgentGroupsReq): TAxiosResponse<TAgentGroupsRes> =>
  api.get('/groups', { params })

const getGroup = (id: number): TAxiosResponse<TAgentGroupRes> => api.get(`/groups/${id}`)

const deleteGroup = (id: number): TAxiosResponse<TAgentGroupRes> =>
  api.delete(`/groups/${id}`)

const updateGroup = (
  id: number,
  body: TUpdateAgentGroupReq,
): TAxiosResponse<TAgentGroupRes> => api.patch(`/groups/${id}`, body)

export const apiAgentGroups = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
}
