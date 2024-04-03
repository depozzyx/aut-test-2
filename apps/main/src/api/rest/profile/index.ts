import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest//types'
import { TProfile } from '@/types/entities/profile'

type TResProfile = {
  statusCode: number
  data: TProfile
}

const get = (): TAxiosResponse<TResProfile> => api.get('/users/me')

export const apiProfile = {
  get,
}
