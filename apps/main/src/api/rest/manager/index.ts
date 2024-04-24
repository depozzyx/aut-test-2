import { api } from '../instance'
import { TAxiosResponse } from '../types'
import { TUpdateManagerReq, TUpdateManagerRes } from './types'

const updateManager = (data: TUpdateManagerReq): TAxiosResponse<TUpdateManagerRes> =>
  api.put('/manager', data)

export const managerApi = {
  updateManager,
}
