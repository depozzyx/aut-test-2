import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TAgentSortBy, TAgentWorkStatus } from '@/features/agents/types'
import { TPagination } from '@/types/entities/pagination'
import { TOrderBy } from '@/types/entities/orderBy'

export type TCreateAgentReq = {
  username: string
  email: string
  password?: string
  sendToEmail: boolean
}

export type TAssignedCampaign = {
  id: number
  intensity: number
  intensityPerAgent: number
  name: string
}

export type TAgent = {
  id: number
  email: string
  username: string
  pbxName: string
  workStatus: TAgentWorkStatus
  assignedCampaigns: TAssignedCampaign[]
  reservedCampaigns: TAssignedCampaign[]
  conversionRate: number
  availability: number
  averageCallDuration: number
  callMinutes: number
  callsHandled: number
  createdAt: string
}

export type TCreateAgentRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TAgent
}

export type TAgentsReq = {
  orderBy: TOrderBy
  workStatus?: TAgentWorkStatus
  search?: string
  sort?: TAgentSortBy
} & Pick<TPagination, 'page' | 'limit'>

export type TAgentsListRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  pagination: TPagination
  data: TAgent[]
}

export type TActiveAgentsRes = TAgentsListRes

export type TPbxAuthRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: {
    password: string
    username: string
    domain: string
  }
}

export type TChangeWorkStatusReq = {
  workStatus: TAgentWorkStatus
  campaignId?: string
}

export type TChangeWorkStatusRes = TCreateAgentRes

export type TUpdateAgentReq = {
  username: string
  email: string
  id: number
}

export type TUpdateAgentRes = TCreateAgentRes

export type TAgentByIdRes = TCreateAgentRes

export type TDeleteAgentRes = TCreateAgentRes

export type TDeletedAgentData = {
  createdAt: string
  email: string
  pbxName: string
  username: string
  workStatus: string
}

export type TAgentStatus = {
  data: 'offline' | 'online' | 'oncall' | 'system_pause' | 'manual_pause' | 'ringing'
}
