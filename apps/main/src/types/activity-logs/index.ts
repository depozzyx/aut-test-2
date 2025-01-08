import { TProfile } from '../entities/profile'

export type TEntityActions =
  | 'create'
  | 'create-api-key'
  | 'delete-api-key'
  | 'import-lead'
  | 'update'
  | 'delete'
  | 'campaign-start'
  | 'campaign-stop'
  | 'export-activity-log'

export type TEntityType =
  | 'user'
  | 'campaign'
  | 'lead'
  | 'lead-list'
  | 'activity-log'
  | 'api-key'

export type TSortBy = 'createdAt' | 'username' | 'role' | 'actionType'

type TActivityLogUser = Omit<TProfile, 'permissions'> & {
  workStatus: 'finish'
  createdAt: string
}

export type TActivityLog = {
  id: number
  actionType: TEntityActions
  entityType: TEntityType
  entityId: number
  details: {
    [key in string]: { [key in string]: string }
  }
  user: TActivityLogUser
  campaign: {
    id: number
    name: string
    intensity: number
    intensityPerAgent: number
  } | null
  targetUser: TActivityLogUser | null
  createdAt: Date
}
