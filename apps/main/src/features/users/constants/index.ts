import { EPermissions, ERoles } from '../../../constants/profile'
import { TUserPermissions } from '../../../types/permissions'

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

export const userPermissions: {
  [key in ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN]: {
    edit: TUserPermissions
    create: TUserPermissions
    delete: TUserPermissions
  }
} = {
  [ERoles.AGENT]: {
    create: EPermissions.CREATE_AGENT as TUserPermissions,
    edit: EPermissions.UPDATE_AGENT as TUserPermissions,
    delete: EPermissions.DELETE_AGENT as TUserPermissions,
  },
  [ERoles.MANAGER]: {
    create: EPermissions.CREATE_MANAGER as TUserPermissions,
    edit: EPermissions.UPDATE_MANAGER as TUserPermissions,
    delete: EPermissions.DELETE_MANAGER as TUserPermissions,
  },
  [ERoles.ADMIN]: {
    create: EPermissions.CREATE_ADMIN as TUserPermissions,
    edit: EPermissions.UPDATE_ADMIN as TUserPermissions,
    delete: EPermissions.DELETE_ADMIN as TUserPermissions,
  },
}
