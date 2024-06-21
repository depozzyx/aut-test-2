import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import { TFeedbackReq } from './types'

const feedback = (data: TFeedbackReq): TAxiosResponse<never> => api.post('/call', data)

export const apiCalls = {
  feedback,
}
