import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { CallIcon } from '@/icons/CallIcon'
import { useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { Thumb } from '@/icons/Thumb'
import { apiCalls } from '@/api-rest/calls'
import { TCallStatuses } from '@/api-rest/calls/types'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'
import { FeedbackButton } from './components/FeedbackButton'
import { handleRestError } from '../common/error'

export const Calls: FC = () => {
  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const { status } = select(agentStatusSelector)
  const [callDuration, setCallDuration] = useState(0)
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)

  const { connect, disconnect, ua, endCall, lead, endedCall, setEndedCall, setLead } =
    useSIPService()

  useEffect(() => {
    if (ua) connect()
  }, [ua])

  useUnmount(() => {
    disconnect()
    if (!(status === 'finish') && (status === 'unpause' || status === 'start'))
      dispatch(agentActions.setStatusAsync('pause'))
  })

  const resetAllData = async () => {
    setCallDuration(0)
    setEndedCall(false)
    setLead(null)
    dispatch(agentActions.setStatusAsync('start'))
  }

  const onCallFeedback = async (status: TCallStatuses) => {
    try {
      if (!lead) return
      setIsFeedbackLoading(true)
      await apiCalls.feedback({
        duration: callDuration,
        status,
        leadId: lead?.lead.id,
        campaignId: lead?.campaign.id,
      })
      await resetAllData()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      setIsFeedbackLoading(false)
    }
  }

  return (
    <Flex justify="center" align="center" styles={{ flex: 1 }}>
      {lead && endedCall && callDuration > 0 && status === 'pause' && (
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
      {!(status === 'on-call') && !lead && !endedCall && !callDuration && (
        <Text styles={{ textAlign: 'center' }} variant="f4">
          {t('noCalls')}
        </Text>
      )}
      {status === 'on-call' && lead && (
        <Card padding="32px 68px" fullWidth maxWidth={582}>
          <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
            {t('newCall')}
          </Text>
          <Flex direction="column" align="center" gap="48px">
            <CallWindow
              endedCall={endedCall}
              setDuration={(duration) => setCallDuration(duration)}
              name={lead.lead.name}
            />
            <CallButton onClick={endCall}>
              <CallIcon />
            </CallButton>
          </Flex>
        </Card>
      )}
    </Flex>
  )
}
