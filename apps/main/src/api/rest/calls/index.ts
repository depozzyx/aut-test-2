import { api } from '@/api-rest/instance'
import { TAxiosResponse } from '@/api-rest/types'
import {
  TCDRList,
  TCDRListReq,
  TFeedbackReq,
  TMakeCallReq,
  TMakeEchoTestReq,
  TPbxHealthCheckResponse,
} from './types'
import { TPaginatedRes } from '../../../types/entities/pagination'

const feedback = (data: TFeedbackReq): TAxiosResponse<never> => api.patch('/call', data)
const makeCall = (data: TMakeCallReq): TAxiosResponse<never> => api.post('/call', data)
const makeEchoTest = (data: TMakeEchoTestReq): TAxiosResponse<never> =>
  api.post('/call/echo-test', data)

const whisperTo = (data: { to: string }): TAxiosResponse<never> =>
  api.post('/call/whisper', data)

const spyTo = (data: { to: string }): TAxiosResponse<never> => api.post('/call/spy', data)

const checkPbxApiHealth = (
  type?: 'api' | 'ws',
): TAxiosResponse<TPbxHealthCheckResponse> =>
  api.get('/pbx/health', type ? { params: { type } } : undefined)

const cdrList = (
  params: TCDRListReq,
  controller?: AbortController,
): TAxiosResponse<TPaginatedRes<TCDRList>> =>
  api.get('/call', { params, signal: controller?.signal })

const cdrRecord = async (requestId: string): Promise<string> => {
  const response = await api.get(`/call/record/${requestId}`, { responseType: 'blob' })
  return URL.createObjectURL(response.data)
}

const cdrFile = async (params: TCDRListReq): Promise<string> => {
  const response = await api.get(`/call/file`, { params, responseType: 'blob' })
  return URL.createObjectURL(response.data)
}

export const apiCalls = {
  feedback,
  makeCall,
  makeEchoTest,
  checkPbxApiHealth,
  cdrList,
  cdrRecord,
  cdrFile,
  whisperTo,
  spyTo,
}
