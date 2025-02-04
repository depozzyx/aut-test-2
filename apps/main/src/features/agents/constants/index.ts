export const AGENT_SORT_BY = {
  CREATED_AT: 'createdAt',
  WORK_STATUS: 'workStatus',
  USERNAME: 'username',
} as const

export const AGENT_WORK_STATUS = {
  START: 'start',
  PAUSE: 'pause',
  UNPAUSE: 'unpause',
  FINISH: 'finish',
  ON_CALL: 'on-call',
} as const

export const AGENT_ACTIVE_WORK_STATUS = {
  ONLINE: 'online',
  FEEDBACK: 'feedback',
  ON_HOLD: 'on-hold',
  ON_CALL: 'on-call',
} as const
