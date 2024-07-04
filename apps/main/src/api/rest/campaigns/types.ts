/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPagination } from '@/types/entities/pagination'
import { TCampaignStatus } from '@/features/campaigns/types'
import { TOrderBy } from '@/types/entities/orderBy'

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

export type TCreateCampaignReq = {
  name: string
  assignedAgentIds?: number[] | []
  reserveAgentIds?: number[] | []
  leadListIds?: number[] | []
}

export type TCreateCampaignRes = any

export type TEditCampaignReq = TCreateCampaignReq & { id: number }
