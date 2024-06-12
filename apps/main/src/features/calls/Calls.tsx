/* eslint-disable i18next/no-literal-string */
import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import { CallIcon } from '@/icons/CallIcon'
import { useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'

export const Calls: FC = () => {
  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const { status } = select(agentStatusSelector)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [callDuration, setCallDuration] = useState(0)

  const { connect, disconnect, ua, endCall, lead, endedCall } = useSIPService()

  useEffect(() => {
    if (ua) connect()
  }, [ua])

  useUnmount(() => {
    disconnect()
    if (!(status === 'finish') && (status === 'unpause' || status === 'start'))
      dispatch(agentActions.setStatusAsync('pause'))
  })

  return (
    <Flex justify="center" align="center" styles={{ flex: 1 }}>
      {!(status === 'on-call') && (
        <Text styles={{ textAlign: 'center' }} variant="f4">
          {t('noCall')}
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
