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

  const statusOptions = Object.keys(CAMPAIGN_STATUSES).map((key) => ({
    value: CAMPAIGN_STATUSES[key as keyof typeof CAMPAIGN_STATUSES],
    label: t(`statuses.${key.toLowerCase()}`),
  }))

  const handleOnChange = useCallback((value: TCampaignStatus) => {
    dispatch(setFilterStatus(value))
  }, [])

  return { handleOnChange, statusOptions }
}
