/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { StatisticsTypeResponse, TCampaignStatus } from '@/features/campaigns/types'
import { TOrder } from '@/types/entities/order'
import { TLeadCallStatusStatisticRawData } from '@/api-rest/lead-list/types'
import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TCampaignOrderBy = 'createdAt' | 'status' | 'name'

export type TActiveCampaignsReq = {
  orderBy?: TCampaignOrderBy
  order?: TOrder
  status?: TCampaignStatus
  search?: string
  ids?: number[]
  fromDate?: string
  toDate?: string
} & Pick<TPagination, 'page' | 'limit'>

export type TAgentAssignedCampaignsReq = {
  orderBy?: TCampaignOrderBy
  order?: TOrder
  status?: TCampaignStatus
} & Pick<TPagination, 'page' | 'limit'>

export type TCampaignListReq = TActiveCampaignsReq

export type TActiveCampaignsRes = any

export type TRecycleRule = {
  status: string
  delay: string
  attempts: number
}

export type TCreateCampaignReq = {
  name: string
  assignedAgentIds?: number[] | []
  reserveAgentIds?: number[] | []
  leadListIds?: number[] | []
  holdTime: number
  mode: string
  coefficient: string
  filterLeadStatuses: string[]
  // recycleRules: TRecycleRule[]
  workHours?: string
}

export type TEditCampaignReq = TCreateCampaignReq & { id: number }

export type TCampaignWSStatus = {
  data: TCampaignStatus
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
