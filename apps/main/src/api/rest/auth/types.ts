import { TUserRoles } from '@/types/roles'
import { TUserPermissions } from '@/types/permissions'
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
  permissions: TUserPermissions[]
}

export type TLoginRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TLoginResponseData
}

export type TLoginWSRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    token: string
  }
}

export type TForgotPasswordReq = {
  email: string
}

export type TForgotPasswordRes = {
  statusCode: number
  meta: unknown
  data: unknown
}

export type TResetPasswordReq = {
  token?: string
  currentPassword?: string
  password: string
  confirmPassword: string
}
