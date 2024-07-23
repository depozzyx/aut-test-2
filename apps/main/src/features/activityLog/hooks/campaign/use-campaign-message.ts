import useTranslation from 'next-translate/useTranslation'
import { TCampaignLogData } from '@/api-rest/campaign-log/types'

type TReturn = {
  createLogMessage: (log: TCampaignLogData) => string
}

export const useCampaignMessage = (): TReturn => {
  const { t } = useTranslation('activity-log')

  const createLogMessage = ({ campaign, actionType }: TCampaignLogData): string => {
    const unknownMessage = t('campaign.logs.default')

    const message = (value1: string) =>
      t(`campaign.logs.actionType.${actionType}`, { value1 })

    switch (actionType) {
      case 'start':
        return message(campaign?.name)
      case 'stop':
        return message(campaign?.name)
      case 'call_initiated':
        return message(campaign?.name)
      case 'call_requeue':
        return message(campaign?.name)
      default:
        return unknownMessage
    }
  }

  return { createLogMessage }
}
