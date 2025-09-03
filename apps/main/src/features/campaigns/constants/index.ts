import { TCampaignActiveStatus } from '@/features/campaigns/types'

export const CAMPAIGN_STATUSES = {
  NEW: 'new',
  ACTIVE: 'active',
  PAUSE: 'pause',
  COMPLETE: 'complete',
  HOLD: 'hold',
} as const

export const campaignDisabledActionStatuses = [
  CAMPAIGN_STATUSES.HOLD,
  CAMPAIGN_STATUSES.ACTIVE,
]

export const isCampaignDisabledAction = (status: TCampaignActiveStatus): boolean =>
  campaignDisabledActionStatuses.includes(status)

export const campaignDisabledActionStatusesMap: Record<string, string> = {
  [CAMPAIGN_STATUSES.HOLD]: '"On Hold"',
  [CAMPAIGN_STATUSES.ACTIVE]: '"Active"',
}

export type TGeneratedCampaignStatuses =
  typeof CAMPAIGN_STATUSES[keyof typeof CAMPAIGN_STATUSES]

export const CALL_TIME = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  ALL_DAY: 'all_day',
} as const

export type TGeneratedCallTime = typeof CALL_TIME[keyof typeof CALL_TIME]

export const CALL_FREQUENCY = {
  EVERY_HOUR: 3600000,
  EVERY_DAY: 86400000,
  EVERY_10_MINUTES: 600000,
  EVERY_HALF_HOUR: 1800000,
} as const

export type TGeneratedCallFrequency = typeof CALL_FREQUENCY[keyof typeof CALL_FREQUENCY]

export const CAMPAIGN_TABLE_TYPES = {
  ACTIVE: 'active',
  LIST: 'list',
} as const

export const FILTER_TYPE = {
  SEARCH: 'searchTerm',
  CAMPAIGN_NAME: 'filterCampaignName',
  STATUS: 'status',
  DATE: 'filterDate',
  ALL: 'all',
} as const

export const SORT_BY = {
  CREATED_AT: 'createdAt',
  WORK_STATUS: 'status',
  NAME: 'name',
} as const

export const INITIAL_REQUEST_PARAMS_CREATE = {
  page: 1,
  limit: 10,
}

export const INITIAL_REQUEST_PARAMS_EDIT = {
  page: 1,
  limit: 100,
}

export const PAGINATION_REQUEST_TIME = 300
