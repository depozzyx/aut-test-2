import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { setFilterStatus } from '@/features/campaigns/store/campaigns'
import { TCampaignStatus } from '@/features/campaigns/types'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'
import { useCallback } from 'react'

type TReturn = {
  handleOnChange: (value: TCampaignStatus) => void
  statusOptions: { value: TCampaignStatus; label: string }[]
}

export const useStatusFilter = (): TReturn => {
  const { t } = useTranslation('campaigns')
  const { dispatch } = useRedux()

  const statusOptions = [
    { value: CAMPAIGN_STATUSES.ACTIVE, label: t('statuses.active') },
    { value: CAMPAIGN_STATUSES.PAUSE, label: t('statuses.pause') },
    { value: CAMPAIGN_STATUSES.COMPLETE, label: t('statuses.complete') },
  ]

  const handleOnChange = useCallback((value: TCampaignStatus) => {
    dispatch(setFilterStatus(value))
  }, [])

  return { handleOnChange, statusOptions }
}
