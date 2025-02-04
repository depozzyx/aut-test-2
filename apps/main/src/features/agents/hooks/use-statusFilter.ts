import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { useCallback } from 'react'
import { TAgentActiveWorkStatus } from '@/features/agents/types'
import { AGENT_ACTIVE_WORK_STATUS } from '@/features/agents/constants'
import { setStatusFilter } from '@/features/agents/store/agents'

type TReturn = {
  handleOnChange: (value: TAgentActiveWorkStatus) => void
  statusOptions: { value: TAgentActiveWorkStatus; label: string }[]
}

export const useStatusFilter = (): TReturn => {
  const { t } = useTranslation('agents')
  const { dispatch } = useRedux()

  const statusOptions = [
    { value: AGENT_ACTIVE_WORK_STATUS.ONLINE, label: t('work-statuses.online') },
    { value: AGENT_ACTIVE_WORK_STATUS.ON_HOLD, label: t('work-statuses.on-hold') },
    {
      value: AGENT_ACTIVE_WORK_STATUS.FEEDBACK,
      label: t('work-statuses.feedback'),
    },
    { value: AGENT_ACTIVE_WORK_STATUS.ON_CALL, label: t('work-statuses.on-call') },
  ]

  const handleOnChange = useCallback((value: TAgentActiveWorkStatus) => {
    dispatch(setStatusFilter(value))
  }, [])

  return { handleOnChange, statusOptions }
}
