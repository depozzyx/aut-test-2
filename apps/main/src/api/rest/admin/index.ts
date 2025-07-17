import { api } from '../instance'

import { TAxiosResponse } from '../types'
import {
  TAdminRes,
  TAdminsListRes,
  TAdminsReq,
  TCreateAdminReq,
  TUpdateAdmin,
} from './types'

const createAdmin = (data: TCreateAdminReq): TAxiosResponse<TAdminRes> =>
  api.post('/users/admin', data)

const updateAdmin = (data: TUpdateAdmin): TAxiosResponse<TAdminRes> =>
  api.put('/users/admin', data)

const deleteAdmin = (id: number): TAxiosResponse<TAdminRes> =>
  api.delete(`/users/admin/${id}`)

const getAdmin = (id: number): TAxiosResponse<TAdminRes> => api.get(`/users/admin/${id}`)

const geAdmins = (params: TAdminsReq): TAxiosResponse<TAdminsListRes> =>
  api.get('/users/admin', { params })

export const adminApi = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  geAdmins,
}
