export type TCallStatuses = 'A' | 'DEAD' | 'CALLBK' | 'DNCL' | 'DNCG' | 'NI'

export type TFeedbackReq = {
  status: TCallStatuses
  requestId: string
}
