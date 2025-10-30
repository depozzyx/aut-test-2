import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TCreateOutboundConfig,
  TDeleteOutboundConfigRes,
  TOutboundConfig,
  TOutboundConfigListReq,
  TOutboundConfigListRes,
  TUpdateOutboundConfig,
  TUpdateOutboundConfigRes,
} from './types'

const getOutboundConfigs = (
  params: TOutboundConfigListReq,
): TAxiosResponse<TOutboundConfigListRes> => api.get('/outbound-configs', { params })

const getOutboundConfig = (id: number): TAxiosResponse<TOutboundConfig> =>
  api.get(`/outbound-configs/${id}`)

const createOutboundConfig = (
  payload: TCreateOutboundConfig,
): TAxiosResponse<TOutboundConfig> => api.post('/outbound-configs', payload)

const updateOutboundConfig = (
  id: number,
  payload: TUpdateOutboundConfig,
): TAxiosResponse<TUpdateOutboundConfigRes> =>
  api.patch(`/outbound-configs/${id}`, payload)

const deleteOutboundConfig = (id: number): TAxiosResponse<TDeleteOutboundConfigRes> =>
  api.delete(`/outbound-configs/${id}`)

export const apiOutboundConfigs = {
  getOutboundConfigs,
  createOutboundConfig,
  deleteOutboundConfig,
  updateOutboundConfig,
  getOutboundConfig,
}
