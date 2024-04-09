export const CAMPAIGN_STATUSES = {
  ACTIVE: 'active',
  PAUSE: 'pause',
  COMPLETE: 'complete',
} as const

export type TGeneratedCampaignStatuses =
  typeof CAMPAIGN_STATUSES[keyof typeof CAMPAIGN_STATUSES]
