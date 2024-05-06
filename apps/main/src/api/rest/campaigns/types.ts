/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { TGeneratedCallTime } from '@/features/campaigns/constants'
import { TCampaignStatus } from '@/features/campaigns/types'
import { TOrderBy } from '@/types/entities/orderBy'

export type TSortBy = 'createdAt' | 'workStatus' | 'name'

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

export type TCreateCampaignReq = {
  name: string
  intensity: number | string
  intensityPerAgent: number | string
  preferredCallTime?: TGeneratedCallTime
  assignedAgentIds?: number[] | []
  reserveAgentIds?: number[] | []
  leadListIds?: number[] | []
}

export type TCreateCampaignRes = any

export type TEditCampaignReq = TCreateCampaignReq & { id: number }
