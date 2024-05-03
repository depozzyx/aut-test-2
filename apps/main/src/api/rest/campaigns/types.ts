/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { TGeneratedCallTime } from '@/features/campaigns/constants'
import { TOrderBy } from '@/types/entities/orderBy'

export type TActiveCampaignsReq = {
  orderBy: TOrderBy
  status?: 'active' | 'pause' | 'complete'
  search?: string
  sortBy?: 'createdAt' | 'workStatus' | 'name'
  name?: string
  fromDate?: string
  toDate?: string
} & Pick<TPagination, 'page' | 'limit'>

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
