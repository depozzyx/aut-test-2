import { TEntityActions, TEntityType, TSortBy } from '@/types/activity-logs'
import { TPagination } from '@/types/entities/pagination'

export type TActivityLogsReq = {
  orderBy: 'ASC' | 'DESC'
  userId?: number
  targetCampaignId?: number
  targetUserId?: number
  entityType?: TEntityType
  entityAction?: TEntityActions
  search?: string
  sortBy?: TSortBy
  fromDate?: string
  toDate?: string
} & Pick<TPagination, 'page' | 'limit'>
