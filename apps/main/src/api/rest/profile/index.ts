import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest//types'
import { TProfile } from '@/types/entities/profile'

type TResProfile = {
  data: TProfile
}

const get = (): TAxiosResponse<TResProfile> => api.get('profile')

export const apiProfile = {
  get,
}
