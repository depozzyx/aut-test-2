import { ERoles } from '../../../constants/profile'
import { api } from '../instance'
import { TAxiosResponse } from '../types'
import {
  TUserByIdRes,
  TUsersListRes,
  TUsersReq,
  TCreateUserReq,
  TCreateUserRes,
  TDeleteUserRes,
  TUpdateUserReq,
  TUpdateUserRes,
} from './types'

const createUser = (role: ERoles, data: TCreateUserReq): TAxiosResponse<TCreateUserRes> =>
  api.post(`/users/${role}`, data)

const updateMe = (
  data: Pick<TUpdateUserReq, 'username' | 'password'>,
): TAxiosResponse<TCreateUserRes> => api.put(`/users/me`, data)

const getUsersList = (role: ERoles, params: TUsersReq): TAxiosResponse<TUsersListRes> =>
  api.get(`/users/${role}`, { params })

const getUserById = (role: ERoles, id: number): TAxiosResponse<TUserByIdRes> =>
  api.get(`/users/${role}/${id}`)

const updateUser = (
  role: ERoles,
  id: number,
  data: TUpdateUserReq,
): TAxiosResponse<TUpdateUserRes> => api.put(`/users/${role}/${id}`, data)

const deleteUser = (role: ERoles, id: number): TAxiosResponse<TDeleteUserRes> =>
  api.delete(`/users/${role}/${id}`)

const toggleBlockUser = (role: ERoles, id: number): TAxiosResponse<TDeleteUserRes> =>
  api.post(`/users/toggle-status/${role}/${id}`)

export const apiUsers = {
  createUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  toggleBlockUser,
}
