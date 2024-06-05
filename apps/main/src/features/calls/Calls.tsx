/* eslint-disable i18next/no-literal-string */
import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import { CallIcon } from '@/icons/CallIcon'
import { useUnmount } from 'react-use'
import { useRedux } from '@/hooks/use-redux'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'

export const Calls: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()
  const { connect, disconnect, ua } = useSIPService()
  const { dispatch, select } = useRedux()
  const { status } = select(agentStatusSelector)

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
      <Card padding="32px 68px" fullWidth maxWidth={582}>
        <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
          New incoming call
        </Text>
        <Flex direction="column" align="center" gap="48px">
          <CallWindow />
          <CallButton>
            <CallIcon />
          </CallButton>
        </Flex>
      </Card>
    </Flex>
  )
}
