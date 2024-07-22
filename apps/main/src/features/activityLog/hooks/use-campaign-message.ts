import { TActivityLog } from '@/types/activity-logs'
import useTranslation from 'next-translate/useTranslation'

export const useCreateLogMessage = (): {
  createLogMessage: (log: TActivityLog) => string
} => {
  const { t } = useTranslation('activity-log')

  const createLogMessage = ({
    user,
    campaign,
    targetUser,
    actionType,
    entityType,
  }: TActivityLog): string => {
    const unknownMessage = t('logs.default')
    const userName = user.role === 'admin' ? t('admin') : user.username ?? ''
    const message = (value1: string, value2?: string) =>
      t(`logs.${entityType}.${actionType}`, { value1, value2 })

    switch (entityType) {
      case 'user':
        switch (actionType) {
          case 'create':
            return message(userName, targetUser?.username ?? '')
          case 'update':
            return message(userName, targetUser?.username ?? '')
          case 'delete':
            return message(userName, targetUser?.username ?? '')
          case 'create-api-key':
            return message(userName)
          case 'delete-api-key':
            return message(userName)
          default:
            return unknownMessage
        }
      case 'campaign':
        switch (actionType) {
          case 'campaign-start':
            return message(userName, campaign?.name)
          case 'campaign-stop':
            return message(userName, campaign?.name)
          case 'create':
            return message(userName, campaign?.name)
          case 'update':
            return message(userName, campaign?.name)
          case 'delete':
            return message(userName, campaign?.name)
          default:
            return unknownMessage
        }
      case 'activity-log':
        switch (actionType) {
          case 'export-activity-log':
            return message(userName)
          default:
            return unknownMessage
        }
      case 'api-key':
        switch (actionType) {
          case 'create-api-key':
            return message(userName)
          case 'delete-api-key':
            return message(userName)
          default:
            return unknownMessage
        }
      case 'lead':
        switch (actionType) {
          case 'import-lead':
            return message(userName)
          default:
            return unknownMessage
        }
      default:
        return unknownMessage
    }
  }
  return { createLogMessage }
}
