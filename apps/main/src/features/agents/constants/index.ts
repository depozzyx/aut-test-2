export const AGENT_SORT_BY = {
  CREATED_AT: 'createdAt',
  WORK_STATUS: 'status',
  USERNAME: 'username',
} as const

export const AGENT_WORK_STATUS = {
  START: 'start',
  PAUSE: 'pause',
  UNPAUSE: 'unpause',
  FINISH: 'finish',
  ON_CALL: 'on-call',
} as const
