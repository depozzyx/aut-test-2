/* eslint-disable i18next/no-literal-string */
import React, { FC } from 'react'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { useStopwatch } from 'react-timer-hook'
import { Wrapper } from './CallWindow.styled'

export const CallWindow: FC = () => {
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
  })

  const formatData = (value: number) => value.toString().padStart(2, '0')

  return (
    <Flex gap="8px" align="center" direction="column">
      <Wrapper justify="center" align="center">
        <Text variant="f2">
          <span>{formatData(hours)}</span>:<span>{formatData(minutes)}</span>:
          <span>{formatData(seconds)}</span>
        </Text>
      </Wrapper>
      <Text>Ashley Cooper</Text>
    </Flex>
  )
}
