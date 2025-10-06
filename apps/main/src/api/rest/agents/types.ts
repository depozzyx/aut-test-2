import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import {
  TAgentActiveWorkStatus,
  TAgentOrderBy,
  TAgentWorkStatus,
} from '@/features/agents/types'
import { TPagination } from '@/types/entities/pagination'
import { TOrder } from '@/types/entities/order'

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

export type TActiveAgent = {
  id: number
  name: string
  pbxName: string
  workStatus: TAgentActiveWorkStatus
  currentCampaign?: null
  callsHandled: number
  country: string
  destination: string
  leadStatus: string
  status: string
  onLineSince: number
  leadId: number
  lastCallAt: number
}

export type TAgentDashboard = {
  currentCampaignName: string
  callsHandled: number
  timeOnline: number
  ongoingTime: string
  currentCampaignNearestCallTime: string
}

export type TCreateAgentRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TAgent
}

export type TAgentsReq = {
  workStatus?: TAgentActiveWorkStatus
  search?: string
  orderBy?: TAgentOrderBy
  order?: TOrder
} & Pick<TPagination, 'page' | 'limit'>

export type TAgentsListRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  pagination: TPagination
  data: TAgent[]
}

export type TActiveAgentsRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  pagination: TPagination
  data: TActiveAgent[]
}

export type TAgentDashboardRes = {
  statusCode: TGeneratedSuccessStatuses
  meta: unknown
  data: TAgentDashboard
}

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
  reason?: string
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

export type AgentStatus = 'offline' | 'online' | 'oncall' | 'pause' | 'ringing'

export type TAgentStatus = {
  data: {
    status: AgentStatus
    exten: string
    reason?: string
  }
}
