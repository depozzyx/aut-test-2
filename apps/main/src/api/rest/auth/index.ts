import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import { TLogInReq, TLogInRes } from './types'

const loginTelegram = (key: TLogInReq): TAxiosResponse<TLogInRes> =>
  api.post('auth/login-telegram', key)

const logout = (): TAxiosResponse<unknown> => api.delete('auth/logout')

export const apiAuth = {
  loginTelegram,
  logout,
}
