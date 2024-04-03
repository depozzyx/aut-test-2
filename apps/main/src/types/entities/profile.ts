export type TUserPermissions =
  | 'agent_page'
  | 'manager_page'
  | 'create_manager'
  | 'update_manager'
  | 'delete_manager'

export type TUserRoles = 'admin' | 'agent' | 'manager'

export type TProfile = {
  id: number
  email: string
  role: TUserRoles
  permissions: TUserPermissions[]
}
