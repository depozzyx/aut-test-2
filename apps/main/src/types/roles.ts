export enum USER_ROLES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  AGENT = 'agent',
}

export type TGeneratedUserRoles = keyof typeof USER_ROLES

export type TUserRoles = 'admin' | 'agent' | 'manager'
