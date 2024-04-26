/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'

export type TActiveCampaignsReq = {
  orderBy: 'ASC' | 'DESC'
  status?: 'active' | 'pause' | 'complete'
  search?: string
  sortBy?: 'createdAt' | 'workStatus' | 'name'
} & Pick<TPagination, 'page' | 'limit'>

export type TActiveCampaignsRes = any

export type TCreateCampaignReq = {
  name: string
  intencity: number
  intencityPerAgent: number
  preferredCallTime: string
  assignedAgentIds: number[]
  reserveAgentIds: number[]
  leadListIds: number[]
}

export type TCreateCampaignRes = any

export type TEditCampaignReq = TCreateCampaignReq
