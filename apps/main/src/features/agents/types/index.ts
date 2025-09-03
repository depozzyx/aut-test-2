export type TAgentWorkStatus = 'start' | 'pause' | 'unpause' | 'finish' | 'on-call'
export type TAgentActiveWorkStatus =
  | 'online'
  | 'pause'
  | 'manual pause'
  | 'feedback'
  | 'on-hold'
  | 'on-call'
export type TAgentOrderBy = 'workStatus' | 'username' | 'createdAt' | 'email' | 'pbxName'

export type TCreateUserFormData = {
  username: string
  email: string
  password: string
  sendToEmail: boolean
  hideLeadPhones?: boolean
}
