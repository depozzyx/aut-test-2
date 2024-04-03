export const USER_ROLES = {
  ADMIN_ROLE: 'admin',
  MANAGER_ROLE: 'manager',
  AGENT_ROLE: 'agent',
} as const

export type TGeneratedUserRoles = typeof USER_ROLES[keyof typeof USER_ROLES]
