import useTranslation from 'next-translate/useTranslation'
import { CALL_TIME, TGeneratedCallTime } from '@/features/campaigns/constants'

type TReturn = {
  callTimeOptions: { value: TGeneratedCallTime; label: string }[]
  getCallTimeLabel: (value: TGeneratedCallTime) => string
}

export const useCallTime = (): TReturn => {
  const { t } = useTranslation('campaigns')

  const callTimeOptions = [
    { label: t('preferredCallTime.morning'), value: CALL_TIME.MORNING },
    { label: t('preferredCallTime.evening'), value: CALL_TIME.EVENING },
    { label: t('preferredCallTime.afternoon'), value: CALL_TIME.AFTERNOON },
    { label: t('preferredCallTime.all-day'), value: CALL_TIME.ALL_DAY },
  ]

  const getCallTimeLabel = (value: TGeneratedCallTime): string =>
    callTimeOptions.find((option) => option.value === value)?.label || ''

  return { callTimeOptions, getCallTimeLabel }
}
