export type TSetting = {
  id: number
  key: string
  value: string
  createdAt: string
  updatedAt: string
}

export type TSettings = {
  data: {
    [key: string]: string
  }
}

export type TSettingReq = {
  value: string
}
