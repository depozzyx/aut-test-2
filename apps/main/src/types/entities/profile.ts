import { TUserRoles } from '../roles'
import { TUserPermissions } from '../permissions'

export type TProfile = {
  id: number
  email: string
  role: TUserRoles
  username: string | null
  permissions: TUserPermissions[]
}
