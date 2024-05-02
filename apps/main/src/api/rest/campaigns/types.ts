/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { TGeneratedCallTime } from '@/features/campaigns/constants'

export type TActiveCampaignsReq = {
  orderBy: 'ASC' | 'DESC'
  status?: 'active' | 'pause' | 'complete'
  search?: string
  sortBy?: 'createdAt' | 'workStatus' | 'name'
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
