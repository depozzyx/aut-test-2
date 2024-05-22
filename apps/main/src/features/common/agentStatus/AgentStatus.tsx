import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { TAgentWorkStatus } from '@/features/agents/types'
import styled from 'styled-components'
import { agentActions } from './store'

const StyledSelect = styled(Select)`
  .custom-rs__control {
    padding: 0px 10px;
  }
`

export const AgentStatus: FC = () => {
  const { t } = useTranslation('user')
  const { dispatch } = useRedux()

  const options: {
    label: string
    value: TAgentWorkStatus
  }[] = [
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

  return (
    <StyledSelect
      width="105px"
      name="workStatus"
      options={options}
      onChange={(e) => {
        if (e?.value && typeof e.value === 'string')
          dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
      }}
    />
  )
}
