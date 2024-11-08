import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import {
  TLoginReq,
  TLoginRes,
  TForgotPasswordRes,
  TResetPasswordReq,
  TForgotPasswordReq,
  TLoginWSRes,
  TCheckResetPasswordTokenReq,
} from './types'

const login = (data: TLoginReq): TAxiosResponse<TLoginRes> =>
  api.post('/auth/login', data)

const loginWS = (): TAxiosResponse<TLoginWSRes> => api.get('/auth/login-ws')

const logout = (): TAxiosResponse<void> => api.delete('/auth/logout')

const forgotPassword = (data: TForgotPasswordReq): TAxiosResponse<TForgotPasswordRes> =>
  api.post('/auth/reset-password', data)

const resetPassword = (data: TResetPasswordReq): TAxiosResponse<TForgotPasswordRes> =>
  api.post('/auth/change-password', data)

const checkResetPasswordToken = (
  token: string,
): TAxiosResponse<TCheckResetPasswordTokenReq> =>
  api.get(`/auth/reset-password/check/${token}`)

export const apiAuth = {
  login,
  loginWS,
  logout,
  forgotPassword,
  resetPassword,
  checkResetPasswordToken,
}
