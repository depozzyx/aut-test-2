import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TCreateRoute,
  TDeleteRouteRes,
  TRoute,
  TRoutesListReq,
  TRoutesListRes,
  TUpdateRoute,
  TUpdateRouteRes,
} from './types'

const getRoutes = (params: TRoutesListReq): TAxiosResponse<TRoutesListRes> =>
  api.get('/routes', { params })

const getRoute = (id: number): TAxiosResponse<TRoute> => api.get(`/routes/${id}`)

const createRoute = (payload: TCreateRoute): TAxiosResponse<TRoute> =>
  api.post('/routes', payload)

const updateRoute = (
  id: number,
  payload: TUpdateRoute,
): TAxiosResponse<TUpdateRouteRes> => api.patch(`/routes/${id}`, payload)

const deleteRoute = (id: number): TAxiosResponse<TDeleteRouteRes> =>
  api.delete(`/outbound-configs/route/${id}`)

export const apiRoutes = {
  getRoutes,
  createRoute,
  deleteRoute,
  updateRoute,
  getRoute,
}
