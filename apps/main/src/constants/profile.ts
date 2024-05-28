export enum ERoles {
  ADMIN = 'admin',
  AGENT = 'agent',
  MANAGER = 'manager',
}

export enum EAdminPermissions {
  AGENT_PAGE = 'agent_page',
  MANAGER_PAGE = 'manager_page',
  CREATE_MANAGER = 'create_manager',
  UPDATE_MANAGER = 'update_manager',
  DELETE_MANAGER = 'delete_manager',
  GET_API_KEY = 'get_api_key',
  GET_MANAGER = 'get_manager',
  UPDATE_CAMPAIGN = 'update_campaign',
  DELETE_CAMPAIGN = 'delete_campaign',
  GET_CAMPAIGN = 'get_campaign',
  START_CAMPAIGN = 'start_campaign',
  STOP_CAMPAIGN = 'stop_campaign',
  UPDATE_AGENT = 'update_agent',
  DELETE_AGENT = 'delete_agent',
  GET_AGENT = 'get_agent',
  UPDATE_LEAD = 'update_lead',
  DELETE_LEAD = 'delete_lead',
  GET_LEAD = 'get_lead',
  IMPORT_LEAD = 'import_lead',
}

export enum EAgentPermissions {
  CREATE_CALL = 'create_call',
}

export enum EManagerPermissions {
  MANAGER_PAGE = 'manager_page',
  GET_API_KEY = 'get_api_key',
  CREATE_API_KEY = 'create_api_key',
  CREATE_MANAGER = 'create_manager',
  UPDATE_MANAGER = 'update_manager',
  DELETE_MANAGER = 'delete_manager',
  GET_MANAGER = 'get_manager',
  CREATE_CAMPAIGN = 'create_campaign',
  UPDATE_CAMPAIGN = 'update_campaign',
  DELETE_CAMPAIGN = 'delete_campaign',
  GET_CAMPAIGN = 'get_campaign',
  START_CAMPAIGN = 'start_campaign',
  STOP_CAMPAIGN = 'stop_campaign',
  CREATE_AGENT = 'create_agent',
  UPDATE_AGENT = 'update_agent',
  DELETE_AGENT = 'delete_agent',
  GET_AGENT = 'get_agent',
  CREATE_LEAD = 'create_lead',
  UPDATE_LEAD = 'update_lead',
  DELETE_LEAD = 'delete_lead',
  GET_LEAD = 'get_lead',
  IMPORT_LEAD = 'import_lead',
}
