import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { TAgentWorkStatus } from '@/features/agents/types'
import styled from 'styled-components'
import { Box } from '@peiko/components/Box'
import { Translate } from 'next-translate'
import { agentActions, agentStatusSelector } from './store'
import { PBXStatus } from './containers/PBXStatus'
import { useAuth } from '../user'

const StyledSelect = styled(Select)`
  .custom-rs__control {
    padding: 0px 10px;
  }
`

const INIT_OPTIONS = (
  t: Translate,
): {
  label: string
  value: TAgentWorkStatus
}[] => [
  {
    label: t('agentStatus.start'),
    value: 'start',
  },
  {
    label: t('agentStatus.pause'),
    value: 'pause',
  },
  {
    label: t('agentStatus.unpause'),
    value: 'unpause',
  },
  {
    label: t('agentStatus.finish'),
    value: 'finish',
  },
]

export const AgentStatus: FC = () => {
  const { t } = useTranslation('user')
  const { dispatch, select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)
  const [options, setOptions] = useState(INIT_OPTIONS(t))
  const { user } = useAuth()

  useEffect(() => {
    if (user?.workStatus) dispatch(agentActions.setStatus(user?.workStatus))
  }, [user])

  useEffect(() => {
    if (pbxStatus === 'offline') {
      setOptions(INIT_OPTIONS(t).filter(({ value }) => value === 'start'))
      return
    }
    if (pbxStatus === 'manual_pause') {
      setOptions(
        INIT_OPTIONS(t).filter(({ value }) => value === 'unpause' || value === 'finish'),
      )
      return
    }
    if (pbxStatus === 'system_pause') {
      setOptions(INIT_OPTIONS(t).filter(({ value }) => value === 'pause'))
      return
    }
    if (pbxStatus === 'oncall' || pbxStatus === 'ringing') {
      setOptions([])
      return
    }
    if (pbxStatus === 'online') {
      setOptions(
        INIT_OPTIONS(t).filter(({ value }) => value === 'pause' || value === 'finish'),
      )
    }
  }, [pbxStatus])

  return (
    <Box styles={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <PBXStatus />
      <StyledSelect
        width="105px"
        name="workStatus"
        options={options}
        readOnlySelection
        onChange={(e) => {
          if (e?.value && typeof e.value === 'string')
            dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
        }}
      />
    </Box>
  )
}
