import { TAgentStatus } from '@/api-rest/agents/types'
import { useRedux } from '@/hooks/use-redux'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { TPalette } from '@peiko/styles/types/palette'
import React, { FC } from 'react'
import { BlinkingButton } from './PBXStatus.styled'
import { agentStatusSelector } from '../../store'

export const PBXStatus: FC = () => {
  const { select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)

  const statusColors = (status: TAgentStatus['data']): keyof TPalette => {
    if (status.status === 'offline') return 'main25'
    if (status.status === 'online') return 'main26'
    if (status.status === 'oncall') return 'main14'
    if (status.status === 'ringing') return 'main10'
    if (status.status === 'pause') return 'main17'
    if (status.status === 'pause' && status.reason === 'feedback') return 'main16'
    return 'main20'
  }

  const reasonToNameMap = {
    manual: 'Manual Pause',
    system: 'System Pause',
    hold: 'On Hold',
    feedback: 'Feedback Pause',
  }
  const getStatusName = () => {
    if (
      pbxStatus.status === 'pause' &&
      pbxStatus.reason &&
      Object.keys(reasonToNameMap).includes(pbxStatus.reason)
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return reasonToNameMap[pbxStatus.reason]
    }

    return pbxStatus.status
      .split('_')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ')
  }

  return (
    <Box
      styles={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '0 24px',
      }}
    >
      <BlinkingButton bgColor={statusColors(pbxStatus)} />
      <Text variant="f10" tag="span" color={statusColors(pbxStatus)}>
        {getStatusName()}
      </Text>
    </Box>
  )
}
