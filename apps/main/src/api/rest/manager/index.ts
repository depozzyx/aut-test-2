/* eslint-disable */
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TManagersReq,
  TManagersRes,
  TUpdateManagerReq,
  TUpdateManagerRes,
  TPostManagerReq,
  TPostManagerRes,
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

const postManager = (data: TPostManagerReq): TAxiosResponse<TPostManagerRes> =>
  api.post('/manager', data)

const updateManager = (data: TUpdateManagerReq): TAxiosResponse<TUpdateManagerRes> =>
  api.put('/manager', data)

const deleteManager = (id: number): TAxiosResponse<TUpdateManagerRes> =>
  api.delete(`/manager/${id}`)

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
  deleteManager,
}
