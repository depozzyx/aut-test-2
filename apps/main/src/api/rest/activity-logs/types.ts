import { TGeneratedSuccessStatuses } from '@/constants/success-status'
import { TEntityActions, TEntityType, TSortBy } from '@/types/activity-logs'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'

type TActivityLogParams = {
  userId?: string
  targetCampaignId?: number
  targetUserId?: number
  entityType?: TEntityType
  entityAction?: TEntityActions
  search?: string
  orderBy?: TSortBy
  order?: TOrder
  fromDate?: string
  toDate?: string
}

export type TActivityLogsReq = TActivityLogParams & Pick<TPagination, 'page' | 'limit'>
export type TExportLogsReq = TActivityLogParams

export type TExportLogsRes = {
  statusCode: TGeneratedSuccessStatuses
  data: {
    filename: string
    data: string
  }
}
