import { TAgentWorkStatus } from '@/features/agents/types'
import { TUserRoles } from '../roles'
import { TUserPermissions } from '../permissions'

export type TProfile = {
  id: number
  email: string
  role: TUserRoles
  workStatus?: TAgentWorkStatus
  username: string | null
  permissions: TUserPermissions[]
}
