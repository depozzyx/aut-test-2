export type TCallStatuses = 'successful' | 'unsuccessful' | 'undetermined'

export type TFeedbackReq = {
  status: TCallStatuses
  requestId: string
}
