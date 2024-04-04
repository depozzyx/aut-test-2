export const SUCCESS_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
} as const

export type TGeneratedSuccessStatuses = typeof SUCCESS_STATUS[keyof typeof SUCCESS_STATUS]
