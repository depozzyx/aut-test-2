import { TUserPermissions, TUserRoles } from '@/types/entities/profile'
import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TLoginReq = {
  email: string
  password: string
}

type TTokenInfo = {
  value: string
  exp: number
}

export type TLoginResponseData = {
  accessToken: TTokenInfo
  refreshToken: TTokenInfo
  role: TUserRoles
  permissions: TUserPermissions
}

export type TLoginRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLoginResponseData
}

export type TResetPasswordReq = {
  email: string
}

export type TResetPasswordRes = {
  statusCode: number
  meta: unknown
  data: unknown
}

export type TChangePasswordReq = {
  token: string
  password: string
  confirmPassword: string
}
