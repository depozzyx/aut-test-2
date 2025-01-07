import { TActivityLog } from '@/types/activity-logs'
import useTranslation from 'next-translate/useTranslation'
import { getLeadStatus } from '@/features/leads/containers/LeadsTable'
import { selectLeadStatuses } from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'

const detailedMessage = (
  id: number,
  details: TActivityLog['details'],
  mapper: Record<string, string>,
  formatter: Record<string, (value: string) => string>,
): string =>
  Object.keys(details).length
    ? `${id ? ` (id ${id})` : ''} - ${Object.keys(details)
        .map((key) =>
          formatter[key]
            ? `${mapper[key]}: ${formatter[key](details[key].old)} > ${formatter[key](
                details[key].new,
              )}`
            : `${mapper[key]}: ${details[key].old} > ${details[key].new}`,
        )
        .join('; ')}`
    : ''

export const useCreateLogMessage = (): {
  createLogMessage: (log: TActivityLog) => string
} => {
  const { t } = useTranslation('activity-log')
  const { select } = useRedux()

  const leadStatuses = select(selectLeadStatuses)

  const keyMaps = {
    lead: {
      name: t(`logs.lead.keys.name`),
      status: t(`logs.lead.keys.status`),
      timezone: t(`logs.lead.keys.timezone`),
    },
  }

  const formatters = {
    lead: {
      status: (statusCode: string) => getLeadStatus(leadStatuses, statusCode),
    },
  }

  const createLogMessage = ({
    user,
    campaign,
    targetUser,
    actionType,
    entityType,
    details,
    entityId,
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
          default:
            return unknownMessage
        }
      case 'campaign':
        switch (actionType) {
          case 'campaign-start':
            return message(userName, campaign?.name ?? '')
          case 'campaign-stop':
            return message(userName, campaign?.name ?? '')
          case 'create':
            return message(userName, campaign?.name ?? '')
          case 'update':
            return message(userName, campaign?.name ?? '')
          case 'delete':
            return message(userName, campaign?.name ?? '')
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
          case 'create':
            return message(userName)
          case 'delete':
            return message(userName)
          default:
            return unknownMessage
        }
      case 'lead':
        switch (actionType) {
          case 'import-lead':
            return message(userName)
          case 'update':
            return (
              message(userName, targetUser?.username ?? '') +
              detailedMessage(entityId, details, keyMaps.lead, formatters.lead)
            )
          case 'delete':
            return message(userName, targetUser?.username ?? '')
          default:
            return unknownMessage
        }
      default:
        return unknownMessage
    }
  }

  return { createLogMessage }
}
