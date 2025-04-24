import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { TAgentWorkStatus } from '@/features/agents/types'
import styled from 'styled-components'
import { Box } from '@peiko/components/Box'
import { Translate } from 'next-translate'
import {
  selectSelectedCampaignId,
  setSelectedCampaignId,
} from '@/features/agents/store/agents'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { apiCampaigns } from '@/api-rest/campaigns'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
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
  const { pbxStatus, hasCurrentRTCSession } = select(agentStatusSelector)
  const [options, setOptions] = useState(INIT_OPTIONS(t))
  const { user } = useAuth()
  const selectedCampaignId = select(selectSelectedCampaignId)
  const router = useRouter()

  useEffect(() => {
    if (user?.workStatus) dispatch(agentActions.setStatus(user?.workStatus))
  }, [user])

  // update available options
  useEffect(() => {
    if (pbxStatus.status === 'offline') {
      setOptions(
        INIT_OPTIONS(t).filter(
          ({ value }) => router.pathname === ROUTES.AGENT_CALLS && value === 'start',
        ),
      )
      return
    }
    if (pbxStatus.status === 'pause' && pbxStatus.reason === 'hold') {
      setOptions(
        INIT_OPTIONS(t).filter(({ value }) => value === 'pause' || value === 'finish'),
      )
      return
    }
    if (pbxStatus.status === 'pause') {
      setOptions(
        INIT_OPTIONS(t).filter(
          ({ value }) =>
            (router.pathname === ROUTES.AGENT_CALLS && value === 'unpause') ||
            value === 'finish',
        ),
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

  const checkAndSetCampaign = async (e: SingleValue<TSelectOption>) => {
    if (e?.value && typeof e.value === 'string') {
      if (e?.value === 'start') {
        if (!selectedCampaignId) {
          dispatch(agentActions.setCheckCampaignId(true))
        } else {
          const { data } = await apiCampaigns.getCampaignStatusById(selectedCampaignId)
          if (data?.data === CAMPAIGN_STATUSES.COMPLETE) {
            dispatch(setSelectedCampaignId(null))
          } else {
            // eslint-disable-next-line no-console
            console.debug('agent status change command: ', e?.value)
            dispatch(agentActions.setSipCanConnect(true))
            setTimeout(() => {
              // eslint-disable-next-line no-console
              console.info('TIMEOUT for connect to SIP before change work status')
              dispatch(agentActions.setStatusAsync('start'))
            }, 500)
            // dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
          }
        }
      } else {
        dispatch(agentActions.setStatusAsync(e?.value as TAgentWorkStatus))
        if (e?.value === 'finish') {
          // eslint-disable-next-line no-console
          console.debug('else agent status change command: ', e?.value)
          dispatch(agentActions.setSipCanConnect(false))
          dispatch(setSelectedCampaignId(null))
        }
      }
    }
  }

  return (
    <Box styles={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <PBXStatus />
      <StyledSelect
        width="105px"
        name="workStatus"
        options={options}
        readOnlySelection
        disabled={
          pbxStatus.status === 'oncall' ||
          pbxStatus.status === 'ringing' ||
          hasCurrentRTCSession
        }
        onChange={checkAndSetCampaign}
      />
    </Box>
  )
}
