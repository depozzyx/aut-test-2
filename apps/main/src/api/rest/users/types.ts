import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import {
  TAgentActiveWorkStatus,
  TAgentOrderBy,
  TAgentWorkStatus,
} from '@/features/agents/types'
import { TPagination } from '@/types/entities/pagination'
import { TOrder } from '@/types/entities/order'

export type TCreateUserReq = {
  username: string
  email: string
  password?: string
  hideLeadPhones?: boolean
}

export type TAssignedCampaign = {
  id: number
  intensity: number
  intensityPerAgent: number
  name: string
}

export type TUser = {
  id: number
  email: string
  username: string
  pbxName: string
  status: string
  hideLeadPhones: boolean
  workStatus: TAgentWorkStatus
  assignedCampaigns: TAssignedCampaign[]
  reservedCampaigns: TAssignedCampaign[]
  createdAt: string
}

export type TCreateUserRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TUser
}

export type TUsersReq = {
  workStatus?: TAgentActiveWorkStatus
  search?: string
  orderBy?: TAgentOrderBy
  order?: TOrder
  showBlocked?: boolean
} & Pick<TPagination, 'page' | 'limit'>

export type TUpdateUserReq = {
  username?: string
  email?: string
  password?: string
  hideLeadPhones?: boolean
}

export type TUsersListRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  pagination: TPagination
  data: TUser[]
}
export type TUpdateUserRes = TCreateUserRes

export type TUserByIdRes = TCreateUserRes

export type TDeleteUserRes = TCreateUserRes

export type AgentStatus = 'offline' | 'online' | 'oncall' | 'pause' | 'ringing'
