import { TActivityLog } from '@/types/activity-logs'

export const useCreateLogMessage = (): {
  createLogMessage: (log: TActivityLog) => string
} => {
  const createLogMessage = ({
    user,
    campaign,
    targetUser,
    actionType,
    entityType,
  }: TActivityLog): string => {
    const unknownMessage = 'Unknown message'
    const userName = user.role === 'admin' ? 'Admin' : user.username
    switch (entityType) {
      case 'user':
        switch (actionType) {
          case 'create':
            return `${userName} has created an account for ${targetUser?.username}`
          case 'update':
            return `${userName} has updated an account for ${targetUser?.username}`
          case 'delete':
            return `${userName} has deleted an account for ${targetUser?.username}`
          case 'create-api-key':
            return `${userName} created api key`
          case 'delete-api-key':
            return `${userName} deleted api key`
          default:
            return unknownMessage
        }
      case 'campaign':
        switch (actionType) {
          case 'campaign-start':
            return `${userName} has started an campaign: ${campaign?.name}`
          case 'campaign-stop':
            return `${userName} has stopped an campaign: ${campaign?.name}`
          case 'create':
            return `${userName} has created an campaign: ${campaign?.name}`
          case 'update':
            return `${userName} has updated an campaign: ${campaign?.name}`
          case 'delete':
            return `${userName} has deleted an campaign: ${campaign?.name}`
          default:
            return unknownMessage
        }
      case 'activity-log':
        switch (actionType) {
          case 'export-activity-log':
            return `${userName} exported activity log`
          default:
            return unknownMessage
        }
      case 'api-key':
        switch (actionType) {
          case 'create-api-key':
            return `${userName} created api key`
          case 'delete-api-key':
            return `${userName} deleted api key`
          default:
            return unknownMessage
        }
      case 'lead':
        switch (actionType) {
          case 'import-lead':
            return `${userName} imported leads`
          default:
            return unknownMessage
        }
      default:
        return unknownMessage
    }
  }
  return { createLogMessage }
}
