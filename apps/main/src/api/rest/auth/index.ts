import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import {
  TLoginReq,
  TLoginRes,
  TResetPasswordRes,
  TChangePasswordReq,
  TResetPasswordReq,
} from './types'

const login = (data: TLoginReq): TAxiosResponse<TLoginRes> =>
  api.post('/auth/login', data)

const logout = (): TAxiosResponse<void> => api.delete('/auth/logout')

const resetPassword = (data: TResetPasswordReq): TAxiosResponse<TResetPasswordRes> =>
  api.post('/auth/reset-password', data)

const changePassword = (data: TChangePasswordReq): TAxiosResponse<TResetPasswordRes> =>
  api.post('/auth/change-password', data)

export const apiAuth = {
  login,
  logout,
  resetPassword,
  changePassword,
}
