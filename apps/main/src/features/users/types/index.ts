export type TAgentWorkStatus = 'start' | 'pause' | 'unpause' | 'finish' | 'on-call'

export type TAgentActiveWorkStatus =
  | 'online'
  | 'pause'
  | 'manual pause'
  | 'feedback'
  | 'on-hold'
  | 'on-call'

export type TUserOrderBy = 'workStatus' | 'username' | 'createdAt' | 'email' | 'pbxName'

export type TUserFormData = {
  username: string
  email: string
  password?: string
  hideLeadPhones?: string
}
