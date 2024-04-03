export type TManagerPermissions =
  | 'manager_page'
  | 'get_api_key'
  | 'create_api_key'
  | 'create_manager'
  | 'update_manager'
  | 'delete_manager'
  | 'get_manager'
  | 'create_campaign'
  | 'update_campaign'
  | 'delete_campaign'
  | 'get_campaign'
  | 'start_campaign'
  | 'stop_campaign'
  | 'create_agent'
  | 'update_agent'
  | 'delete_agent'
  | 'get_agent'
  | 'create_lead'
  | 'update_lead'
  | 'delete_lead'
  | 'get_lead'
  | 'import_lead'

export type TAdminPermissions =
  | 'agent_page'
  | 'manager_page'
  | 'create_manager'
  | 'update_manager'
  | 'delete_manager'

export type TUserPermissions = TManagerPermissions | TAdminPermissions

export type TUserRoles = 'admin' | 'agent' | 'manager'

export type TProfile = {
  id: number
  email: string
  role: TUserRoles
  permissions: TUserPermissions[]
}
