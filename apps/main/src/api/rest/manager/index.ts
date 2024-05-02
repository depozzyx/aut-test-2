import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TManagersReq, TManagersRes, TUpdateManagerReq, TUpdateManagerRes } from './types'

const updateManager = (data: TUpdateManagerReq): TAxiosResponse<TUpdateManagerRes> =>
  api.put('/manager', data)

const getManagers = (params: TManagersReq): TAxiosResponse<TManagersRes> =>
  api.get('/manager/list', { params })

export const managerApi = {
  updateManager,
  getManagers,
}
