/* eslint-disable i18next/no-literal-string */
import React, { FC, useEffect } from 'react'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { useStopwatch } from 'react-timer-hook'
import { Wrapper } from './CallWindow.styled'

export const CallWindow: FC<{
  name: string
  endedCall: boolean
  setDuration: (duration: number) => void
}> = ({ name, endedCall, setDuration }) => {
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
      <Text>{name}</Text>
    </Flex>
  )
}
