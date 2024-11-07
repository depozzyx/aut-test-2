import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { TAgentWorkStatus } from '@/features/agents/types'
import styled from 'styled-components'
import { Box } from '@peiko/components/Box'
import { Translate } from 'next-translate'
import { selectSelectedCampaignId } from '@/features/agents/store/agents'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { useAuth } from '../user'
import { PBXStatus } from './containers/PBXStatus'
import { agentActions, agentStatusSelector } from './store'

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
  const selectedCampaignId = select(selectSelectedCampaignId)
  const { setModal } = useModals()
  const router = useRouter()

  useEffect(() => {
    if (user?.workStatus) dispatch(agentActions.setStatus(user?.workStatus))
  }, [user])

  useEffect(() => {
    if (pbxStatus.status === 'offline') {
      setOptions(INIT_OPTIONS(t).filter(({ value }) => value === 'start'))
      return
    }
    if (pbxStatus.status === 'manual_pause') {
      setOptions(
        INIT_OPTIONS(t).filter(
          ({ value }) =>
            (router.pathname === ROUTES.AGENT_CALLS && value === 'unpause') ||
            value === 'finish',
        ),
      )
      return
    }
    if (pbxStatus.status === 'system_pause') {
      setOptions(
        INIT_OPTIONS(t).filter(({ value }) => value === 'pause' || value === 'finish'),
      )
      return
    }
    if (pbxStatus.status === 'oncall' || pbxStatus.status === 'ringing') {
      setOptions([])
      return
    }
    if (pbxStatus.status === 'online') {
      setOptions(
        INIT_OPTIONS(t).filter(({ value }) => value === 'pause' || value === 'finish'),
      )
    }
  }, [pbxStatus.status])

  return (
    <Box styles={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <PBXStatus />
      <StyledSelect
        width="105px"
        name="workStatus"
        options={options}
        readOnlySelection
        disabled={pbxStatus.status === 'oncall' || pbxStatus.status === 'ringing'}
        onChange={(e) => {
          if (e?.value && typeof e.value === 'string') {
            if (e?.value === 'start' && !selectedCampaignId) {
              setModal({ modalName: MODAL_NAMES.SELECT_AGENT_CAMPAIGN, isOpen: true })
            } else {
              dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
            }
          }
        }}
      />
    </Box>
  )
}
