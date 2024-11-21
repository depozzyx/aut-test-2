import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { useMount, useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { CallIcon } from '@/icons/CallIcon'
import { useRedux } from '@/hooks/use-redux'
import { Thumb } from '@/icons/Thumb'
import { apiCalls } from '@/api-rest/calls'
import { TCallStatuses } from '@/api-rest/calls/types'
import { useAuth } from '@/features/common/user'
import {
  selectSelectedCampaignId,
  setSelectedCampaignId,
} from '@/features/agents/store/agents'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TCampaign } from '@/features/campaigns/types'
import { apiAgents } from '@/api-rest/agents'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'
import { FeedbackButton } from './components/FeedbackButton'
import { handleRestError } from '../common/error'

const SelectAgentCampaignModal = dynamic(
  () =>
    import('./containers/modals/SelectAgentCampaignModal').then(
      (mod) => mod.SelectAgentCampaignModal,
    ),
  {
    ssr: false,
  },
)

export const Calls: FC = () => {
  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const { pbxStatus, status, checkCampaignId } = select(agentStatusSelector)
  const [callDuration, setCallDuration] = useState(0)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
  const { connect, disconnect, ua, endCall, lead, endedCall, setEndedCall, setLead } =
    useSIPService()
  const { user } = useAuth()
  const { modalState, setModal } = useModals()

  const selectedCampaignId = select(selectSelectedCampaignId)

  useEffect(() => {
    if (ua && !ua?.isConnected()) {
      connect()
    }
  }, [ua])

  useEffect(() => {
    if (!pbxStatus.campaignNotCompleted) {
      if (['online', 'system_pause'].includes(pbxStatus.status)) {
        dispatch(agentActions.setStatusAsync('finish'))
      }
      if (pbxStatus.status !== 'oncall') {
        dispatch(setSelectedCampaignId(null))
      }
    }
  }, [pbxStatus])

  useMount(() => {
    const checkStatus = async () => {
      const response = await apiAgents.getAgentStatus({})
      if (response.data.data.status === 'online') {
        dispatch(agentActions.setStatusAsync('finish'))
      }
    }
    checkStatus()
  })

  useUnmount(() => {
    if (
      pbxStatus.status !== 'offline' &&
      status !== 'finish' &&
      status !== 'pause' &&
      pbxStatus.status !== 'manual_pause'
    ) {
      dispatch(agentActions.setStatusAsync('pause'))
    } else {
      disconnect()
    }
  })

  const [campaigns, setCampaigns] = useState<Partial<TCampaign>[]>([])
  const [onSelectedCampaign, setOnSelectedCampaign] = useState(false)

  const openModal = () => {
    setModal({ modalName: MODAL_NAMES.SELECT_AGENT_CAMPAIGN, isOpen: true })
  }

  const setCampaignId = async (createCallback?: boolean): Promise<number | null> => {
    if (user?.role === 'agent' && !selectedCampaignId) {
      if (createCallback) {
        setOnSelectedCampaign(true)
      }
      const response = await apiCampaigns.getAgentAssignedActiveCampaigns()
      const campaignsData = response?.data?.data
      setCampaigns([])
      if (campaignsData.length) {
        setCampaigns(campaignsData)
        if (campaignsData.length === 1) {
          const campaignId = campaignsData[0].id
          if (campaignId) {
            dispatch(setSelectedCampaignId(String(campaignId)))
            return campaignId
          }
        } else {
          openModal()
        }
      } else {
        setCampaigns([])
        openModal()
      }
    }
    return null
  }

  useEffect(() => {
    if (checkCampaignId) {
      dispatch(agentActions.setCheckCampaignId(false))
      setCampaignId(true).then((id) => {
        if (id) {
          dispatch(agentActions.setStatusAsync('start'))
        }
      })
    }
  }, [checkCampaignId])

  const resetAllData = async () => {
    setCallDuration(0)
    setEndedCall(false)
    setLead(null)
  }

  const onCallFeedback = async (status: TCallStatuses) => {
    try {
      if (!lead) return
      setIsFeedbackLoading(true)
      await apiCalls.feedback({
        status,
        requestId: lead.requestId,
      })
      await resetAllData()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      setIsFeedbackLoading(false)
    }
  }

  useEffect(() => {
    if (['online', 'system_pause'].includes(pbxStatus.status) && endedCall) {
      // eslint-disable-next-line no-console
      resetAllData()
    }
  }, [pbxStatus.status])

  useEffect(() => {
    setCampaignId()
  }, [selectedCampaignId])

  const showModal =
    modalState?.modalName === MODAL_NAMES.SELECT_AGENT_CAMPAIGN && modalState.isOpen

  return (
    <>
      <Flex justify="center" align="center" styles={{ flex: 1 }}>
        {lead?.requestId && endedCall && (
          <Card
            padding="32px 60px"
            maxWidth="440px"
            fullWidth
            styles={{ textAlign: 'center' }}
          >
            <Text variant="f2">{t('newCall')}</Text>
            <Flex justify="center" gap="32px" styles={{ marginTop: '48px' }}>
              <div>
                <FeedbackButton
                  isLoading={isFeedbackLoading}
                  status="success"
                  onClick={() => onCallFeedback('successful')}
                >
                  <Thumb />
                </FeedbackButton>
                <Text styles={{ marginTop: '4px' }} variant="f8">
                  {t('success')}
                </Text>
              </div>
              <div>
                <FeedbackButton
                  isLoading={isFeedbackLoading}
                  status="failure"
                  onClick={() => onCallFeedback('unsuccessful')}
                >
                  <Thumb direction="right" />
                </FeedbackButton>
                <Text styles={{ marginTop: '4px' }} variant="f8">
                  {t('failure')}
                </Text>
              </div>
            </Flex>
          </Card>
        )}
        {!(pbxStatus.status === 'oncall') && !lead && !endedCall && !callDuration && (
          <Text styles={{ textAlign: 'center' }} variant="f4">
            {t('noCalls')}
          </Text>
        )}
        {pbxStatus.status === 'oncall' && lead && (
          <Card padding="32px 68px" fullWidth maxWidth={582}>
            <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
              {t('newCall')}
            </Text>
            <Flex direction="column" align="center" gap="48px">
              <CallWindow
                endedCall={endedCall}
                setDuration={(duration) => setCallDuration(duration)}
                callData={lead}
              />
              <CallButton onClick={() => endCall(true)} isLoading={endedCall}>
                <CallIcon />
              </CallButton>
            </Flex>
          </Card>
        )}
      </Flex>
      {showModal && (campaigns.length > 1 || campaigns.length === 0) && (
        <SelectAgentCampaignModal
          campaigns={campaigns}
          onSelectedCampaign={onSelectedCampaign}
          callback={(id: string | undefined) => {
            if (id) {
              dispatch(agentActions.setStatusAsync('start'))
              setOnSelectedCampaign(false)
            }
          }}
        />
      )}
    </>
  )
}
