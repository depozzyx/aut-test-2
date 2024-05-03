import { TEntityActions, TEntityType, TSortBy } from '@/types/activity-logs'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'

export type TActivityLogsReq = {
  orderBy?: TOrderBy
  userId?: string
  targetCampaignId?: number
  targetUserId?: number
  entityType?: TEntityType
  entityAction?: TEntityActions
  search?: string
  sortBy?: TSortBy
  fromDate?: string
  toDate?: string
} & Pick<TPagination, 'page' | 'limit'>
