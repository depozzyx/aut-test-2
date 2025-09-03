import { ERoles } from '../../../constants/profile'

export const USER_ORDER_BY = {
  CREATED_AT: 'createdAt',
  WORK_STATUS: 'workStatus',
  USERNAME: 'username',
  EMAIL: 'email',
  PBX_NAME: 'pbxName',
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
  PAUSE: 'pause',
  MANUAL_PAUSE: 'manual pause',
} as const

export const roleUserTranslationKey: Record<
  ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN,
  string
> = {
  [ERoles.AGENT]: 'agents',
  [ERoles.MANAGER]: 'managers',
  [ERoles.ADMIN]: 'admins',
}
