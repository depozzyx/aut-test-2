export enum USER_PERMISSIONS {
  AGENT_PAGE = 'agent_page',
  MANAGER_PAGE = 'manager_page',
  CREATE_MANAGER = 'create_manager',
  UPDATE_MANAGER = 'update_manager',
  DELETE_MANAGER = 'delete_manager',
}

export type TGeneratedUserPermissions = keyof typeof USER_PERMISSIONS
