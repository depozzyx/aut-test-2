export type TAgentWorkStatus = 'start' | 'pause' | 'unpause' | 'finish' | 'on-call'
export type TAgentSortBy = 'createdAt' | 'workStatus' | 'username'

export type TCreateAgentFormData = {
  username: string
  email: string
  password: string
  sendToEmail: boolean
}
