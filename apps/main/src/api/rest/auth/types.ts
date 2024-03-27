export type TLoginReq = {
  email: string
  password: string
}

type TTokenInfo = {
  value: string
  exp: number
}

type TCommonResponseData = {
  accessToken: TTokenInfo
  refreshToken: TTokenInfo
}

type TBaseResponse = {
  statusCode: number
  data: TCommonResponseData
}

export type TLoginRes = TBaseResponse

export type TLogoutRes = TBaseResponse & {
  meta: unknown
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
