export type TStatuses = 'success' | 'error' | 'info'

export type TTranslationValues = {
  [key: string]: string | number | undefined
}

export type TNotification = {
  key: string
  status: TStatuses
  values: TTranslationValues
}
