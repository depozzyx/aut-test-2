/* eslint-disable */
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TManagersReq,
  TApiKeyRes,
  TApiKeysListRes,
} from './types'

const getManagerApiKeyById = (id: number): TAxiosResponse<TApiKeyRes> =>
  api.get(`/manager/api-key/${id}`)

const removeManagerApiKeyById = (id: number): TAxiosResponse<undefined> =>
  api.delete(`/manager/api-key/${id}`)

const getManagerApiKey = (params: TManagersReq): TAxiosResponse<TApiKeysListRes> =>
  api.get('/manager/api-key', { params })

const postManagerApiKey = (): TAxiosResponse<TApiKeyRes> => api.post('/manager/api-key')

export const managerApi = {
  getManagerApiKeyById,
  removeManagerApiKeyById,
  getManagerApiKey,
  postManagerApiKey,
}
