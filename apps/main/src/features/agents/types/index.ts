export type TAgentWorkStatus = 'start' | 'pause' | 'unpause' | 'finish' | 'on-call'
export type TAgentActiveWorkStatus =
  | 'online'
  | 'pause'
  | 'manual pause'
  | 'feedback'
  | 'on-hold'
  | 'on-call'
export type TAgentSortBy = 'workStatus' | 'username' | 'createdAt'

export type TCreateAgentFormData = {
  username: string
  email: string
  password: string
  sendToEmail: boolean
}
