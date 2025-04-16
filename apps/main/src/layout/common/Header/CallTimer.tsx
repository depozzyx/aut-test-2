import React from 'react'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { CallIcon } from '@/icons/CallIcon'
import { CallButton } from '@/features/calls/components/CallButton/CallButton'
import { useStopwatch } from 'react-timer-hook'

export const CallTimer = ({ onClick }: { onClick: () => void }): JSX.Element => {
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
  })
  const formatData = (value: number) => value.toString().padStart(2, '0')

  const callTime = `${formatData(hours)}:${formatData(minutes)}:${formatData(seconds)}`
  return (
    <Flex gap="8px" align="center">
      <CallButton onClick={onClick} size="s">
        <CallIcon />
      </CallButton>
      <Text variant="f8">{callTime}</Text>
    </Flex>
  )
}
