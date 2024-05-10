import useTranslation from 'next-translate/useTranslation'
import { CALL_FREQUENCY } from '@/features/campaigns/constants'

type TReturn = {
  callFrequencyOptions: { value: string | number; label: string }[]
  getCallFrequencyLabel: (value: string | number) => string
}

export const useCallFrequency = (): TReturn => {
  const { t } = useTranslation('campaigns')

  const callFrequencyOptions = [
    { label: t('callFrequency.every-hour'), value: CALL_FREQUENCY.EVERY_HOUR },
    { label: t('callFrequency.every-day'), value: CALL_FREQUENCY.EVERY_DAY },
    {
      label: t('callFrequency.every-10-minutes'),
      value: CALL_FREQUENCY.EVERY_10_MINUTES,
    },
    { label: t('callFrequency.every-half'), value: CALL_FREQUENCY.EVERY_HALF_HOUR },
  ]
  const getCallFrequencyLabel = (value: string | number): string =>
    callFrequencyOptions.find((option) => option.value === value)?.label || ''

  return { callFrequencyOptions, getCallFrequencyLabel }
}
