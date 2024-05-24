/* eslint-disable */
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TManagersReq, TManagersRes, TUpdateManagerReq, TUpdateManagerRes, TPostManagerReq } from './types'

const getManagerApiKeyById = (id: number): TAxiosResponse<any> =>
  api.get(`/manager/api-key/${id}`)

const removeManagerApiKeyById = (id: number): TAxiosResponse<any> =>
  api.delete(`/manager/api-key/${id}`)

const getManagerApiKey = (params: TManagersReq): TAxiosResponse<any> => 
  api.get('/manager/api-key', { params })

const postManagerApiKey = (): TAxiosResponse<any> => api.post('/manager/api-key')

const postManager = (data: TPostManagerReq): TAxiosResponse<TManagersRes> =>
  api.post('/manager/',  data )

const updateManager = (data: TUpdateManagerReq): TAxiosResponse<TUpdateManagerRes> =>
  api.put('/manager', data)

const getManager = (): TAxiosResponse<any> => api.get('/manager')

const getManagers = (params: TManagersReq): TAxiosResponse<TManagersRes> =>
  api.get('/manager/list', { params })

export const managerApi = {
  getManagerApiKeyById,
  removeManagerApiKeyById,
  getManagerApiKey,
  postManagerApiKey,
  postManager,
  updateManager,
  getManager,
  getManagers,
}
