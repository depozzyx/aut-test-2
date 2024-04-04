export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AGENT: 'agent',
} as const

export type TGeneratedUserRoles = typeof USER_ROLES[keyof typeof USER_ROLES]
