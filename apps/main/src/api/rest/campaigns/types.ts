/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { StatisticsTypeResponse, TCampaignStatus } from '@/features/campaigns/types'
import { TOrderBy } from '@/types/entities/orderBy'
import { TLeadCallStatusStatisticRawData } from '@/api-rest/lead-list/types'
import { TGeneratedSuccessStatuses } from '@/constants/success-status'

export type TSortBy = 'createdAt' | 'status' | 'name'

export type TActiveCampaignsReq = {
  orderBy: TOrderBy
  status?: TCampaignStatus
  search?: string
  sortBy?: TSortBy
  name?: string
  fromDate?: string
  toDate?: string
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
  recycleRules: TRecycleRule[]
  workHours?: string
}

export type TEditCampaignReq = TCreateCampaignReq & { id: number }

export type TCampaignWSStatus = {
  data: TCampaignStatus
}

export type TCampaignWSStatistic = {
  data: {
    campaignId: number
    statistic: StatisticsTypeResponse
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
