/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import {
  StatisticsTypeResponse,
  TCampaign,
  TCampaignStatus,
} from '@/features/campaigns/types'
import { TOrder } from '@/types/entities/order'
import { TLeadCallStatusStatisticRawData } from '@/api-rest/lead-list/types'
import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TAgentGroup } from '../users/groups.types'

export type TCampaignOrderBy = 'createdAt' | 'status' | 'name'

export enum ECampaignDeleteOptions {
  DELETE_LEAD_LISTS = 'delete',
  UNATTACH_LEAD_LISTS = 'unattach',
  KEEP_LEAD_LISTS = 'keep',
}

export type TActiveCampaignsReq = {
  orderBy?: TCampaignOrderBy
  order?: TOrder
  status?: TCampaignStatus
  search?: string
  ids?: number[]
  fromDate?: string
  toDate?: string
} & Partial<Pick<TPagination, 'page' | 'limit'>>

export type TAgentAssignedCampaignsReq = {
  orderBy?: TCampaignOrderBy
  order?: TOrder
  status?: TCampaignStatus
} & Pick<TPagination, 'page' | 'limit'>

export type TCampaignListReq = TActiveCampaignsReq

export type TActiveCampaignsRes = any

export type TRecycleRule = {
  status: string[]
  delay: string
  attempts: number
  finalStatus: string
}

export type TCreateCampaignReq = {
  name: string
  assignedAgentIds?: number[] | []
  reserveAgentIds?: number[] | []
  leadListIds?: number[] | []
  agentGroupIds?: number[] | []
  holdTime: number
  mode: string
  coefficient: number
  filterLeadStatuses: string[]
  recycleRules: TRecycleRule[]
  workHours?: string
}
export type TLeadList = {
  id: number
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
  campaign?: TCampaign
}

export type TAgent = {
  id: number
  username: string
}

export type TCampaignById = {
  id: number
  name: string
  assignedAgents: TAgent[]
  leadLists: TLeadList[]
  agentGroups: TAgentGroup[]
  holdTime: number
  mode: string
  coefficient: number
  filterLeadStatuses: string[]
  recycleRules: TRecycleRule[]
  workHours: string
  status: TCampaignStatus
}
export type TEditCampaignReq = TCreateCampaignReq & { id: number }

export type TCampaignWSStatus = {
  data: TCampaignStatus
  nearestTime?: string
}

export type TCampaignWSStatistic = {
  data: {
    campaignId: number
    data: StatisticsTypeResponse
  }
}

export type TAgentCalls = {
  userId: number
  agentName: string
  total: string
}

export type TCampaignInfo = {
  id: number
  name: string
  status: string
  callsToday: number
  agentsCalls: TAgentCalls[]
  byLeadStatuses: TLeadCallStatusStatisticRawData
}

export type TCampaignInfoRes = {
  statusCode: TGeneratedSuccessStatuses
  data: TCampaignInfo
}
