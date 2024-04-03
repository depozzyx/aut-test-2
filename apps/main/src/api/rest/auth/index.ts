import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import {
  TLoginReq,
  TLoginRes,
  TForgotPasswordRes,
  TResetPasswordReq,
  TForgotPasswordReq,
} from './types'

const login = (data: TLoginReq): TAxiosResponse<TLoginRes> =>
  api.post('/auth/login', data)

const logout = (): TAxiosResponse<void> => api.delete('/auth/logout')

const forgotPassword = (data: TForgotPasswordReq): TAxiosResponse<TForgotPasswordRes> =>
  api.post('/auth/reset-password', data)

const resetPassword = (data: TResetPasswordReq): TAxiosResponse<TForgotPasswordRes> =>
  api.post('/auth/change-password', data)

export const apiAuth = {
  login,
  logout,
  forgotPassword,
  resetPassword,
}
