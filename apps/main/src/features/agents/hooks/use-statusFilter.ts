import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { useCallback } from 'react'
import { TAgentWorkStatus } from '@/features/agents/types'
import { AGENT_WORK_STATUS } from '@/features/agents/constants'
import { setStatusFilter } from '@/features/agents/store/agents'

type TReturn = {
  handleOnChange: (value: TAgentWorkStatus) => void
  statusOptions: { value: TAgentWorkStatus; label: string }[]
}

export const useStatusFilter = (): TReturn => {
  const { t } = useTranslation('agents')
  const { dispatch } = useRedux()

  const statusOptions = [
    { value: AGENT_WORK_STATUS.START, label: t('statuses.start') },
    { value: AGENT_WORK_STATUS.PAUSE, label: t('statuses.pause') },
    { value: AGENT_WORK_STATUS.UNPAUSE, label: t('statuses.unpause') },
    { value: AGENT_WORK_STATUS.FINISH, label: t('statuses.finish') },
    { value: AGENT_WORK_STATUS.ON_CALL, label: t('statuses.on-call') },
  ]

  const handleOnChange = useCallback((value: TAgentWorkStatus) => {
    dispatch(setStatusFilter(value))
  }, [])

  return { handleOnChange, statusOptions }
}
