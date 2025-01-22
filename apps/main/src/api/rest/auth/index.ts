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
  TCheckResetPasswordTimerRes,
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

const checkResetPasswordTimer = (
  email: string,
): TAxiosResponse<TCheckResetPasswordTimerRes> =>
  api.get(`/auth/reset-password/check/timer`, { params: { email } })

export const apiAuth = {
  login,
  loginWS,
  logout,
  forgotPassword,
  resetPassword,
  checkResetPasswordToken,
  checkResetPasswordTimer,
}
