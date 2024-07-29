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
  const { status } = select(agentStatusSelector)
  const [options, setOptions] = useState(INIT_OPTIONS(t))

  useEffect(() => {
    if (status === 'pause') {
      setOptions(
        INIT_OPTIONS(t).filter(
          (option) => option.value !== 'start' && option.value !== 'finish',
        ),
      )
    } else if (
      status === null ||
      status === 'finish' ||
      status === 'start' ||
      status === 'on-call'
    ) {
      setOptions(INIT_OPTIONS(t).filter((option) => option.value !== 'unpause'))
    } else {
      setOptions(INIT_OPTIONS(t))
    }
  }, [status])

  return (
    <Box styles={{ display: 'felx', alignItems: 'center', gap: '0' }}>
      <PBXStatus />
      <StyledSelect
        width="105px"
        name="workStatus"
        options={options}
        value={status === 'on-call' ? 'start' : status ?? undefined}
        onChange={(e) => {
          if (e?.value && typeof e.value === 'string')
            dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
        }}
      />
    </Box>
  )
}
