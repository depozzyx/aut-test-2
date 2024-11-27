import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest//types'
import { TSetting, TSettingReq, TSettings } from '@/api-rest/settings/types'

type TResSetting = {
  statusCode: number
  data: TSetting
}

type TResSettings = {
  statusCode: number
  data: TSettings
}

const get = (key: string): TAxiosResponse<TResSetting> => api.get(`/settings/${key}`)

const list = (keys: string[]): TAxiosResponse<TResSettings> =>
  api.get('/settings', {
    params: {
      keys: keys.join(','),
    },
  })

const upsert = (key: string, data: TSettingReq): TAxiosResponse<TResSetting> =>
  api.put(`/settings/${key}`, data)

const upsertMany = (data: TSettings): TAxiosResponse<TResSetting> =>
  api.put('/settings', data)

export const apiSettings = {
  get,
  list,
  upsert,
  upsertMany,
}
