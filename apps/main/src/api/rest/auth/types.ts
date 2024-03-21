export type TLogInReq = {
  key: string
}

export type TLogInRes = {
  accessToken: {
    value: string
    exp: number
  }
  refreshToken: {
    value: string
    exp: number
  }
}
