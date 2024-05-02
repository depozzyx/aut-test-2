export const CAMPAIGN_STATUSES = {
  ACTIVE: 'active',
  PAUSE: 'pause',
  COMPLETE: 'complete',
} as const

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
