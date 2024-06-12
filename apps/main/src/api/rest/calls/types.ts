export type TCallStatuses = 'successful' | 'unsuccessful' | 'undetermined'

export type TFeedbackReq = {
  duration: number
  status: TCallStatuses
  leadId: number
  campaignId: number
}
