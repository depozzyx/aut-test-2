import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import { TFeedbackReq, TMakeCallReq, TMakeEchoTestReq } from './types'

const feedback = (data: TFeedbackReq): TAxiosResponse<never> => api.patch('/call', data)
const makeCall = (data: TMakeCallReq): TAxiosResponse<never> => api.post('/call', data)
const makeEchoTest = (data: TMakeEchoTestReq): TAxiosResponse<never> =>
  api.post('/call/echo-test', data)

export const apiCalls = {
  feedback,
  makeCall,
  makeEchoTest,
}
