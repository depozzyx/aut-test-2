/* eslint-disable i18next/no-literal-string */
import React, { FC, useEffect } from 'react'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { useStopwatch } from 'react-timer-hook'
import useTranslation from 'next-translate/useTranslation'
import { TLeadStatusData } from '@/api-rest/leads/types'
import { getLeadStatus } from '@/features/leads/containers/LeadsTable'
import { Wrapper } from './CallWindow.styled'
import { TCallsInit } from '../../../../api/socket/call/types'

const unknownString = 'unknown'

export const CallWindow: FC<{
  callData?: TCallsInit
  endedCall: boolean
  setDuration: (duration: number) => void
  leadStatuses: TLeadStatusData[]
}> = ({ callData, endedCall, setDuration, leadStatuses }) => {
  const { t } = useTranslation('calls')
  const { seconds, minutes, hours, totalSeconds } = useStopwatch({
    autoStart: true,
  })

  useEffect(() => {
    if (endedCall) setDuration(totalSeconds * 1000)
  }, [endedCall])

  const formatData = (value: number) => value.toString().padStart(2, '0')

  return (
    <Flex gap="8px" align="center" direction="column">
      <Wrapper justify="center" align="center">
        <Text variant="f2">
          <span>{formatData(hours)}</span>:<span>{formatData(minutes)}</span>:
          <span>{formatData(seconds)}</span>
        </Text>
      </Wrapper>
      <Flex justify="start" direction="column">
        <Text>
          {t('campaign')}: {callData?.campaign?.name || unknownString}
        </Text>
        <Text>
          {t('lead')}: {callData?.lead?.name || unknownString}
        </Text>
        <Text>
          {t('phone')}: {callData?.lead?.phone || unknownString}
        </Text>
        <Text>
          {t('timezone')}: {callData?.lead?.timezone || unknownString}
        </Text>
        <Text>
          {t('status')}:{' '}
          {callData?.lead?.status
            ? getLeadStatus(leadStatuses, callData?.lead?.status)
            : unknownString}
        </Text>
        <Text>
          {t('source')}: {callData?.lead?.source || unknownString}
        </Text>
      </Flex>
    </Flex>
  )
}
