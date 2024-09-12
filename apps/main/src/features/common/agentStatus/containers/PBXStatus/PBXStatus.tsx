import { apiAgents } from '@/api-rest/agents'
import { TAgentStatus } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { TPalette } from '@peiko/styles/types/palette'
import React, { FC, useEffect, useState } from 'react'
import { BlinkingButton } from './PBXStatus.styled'

export const PBXStatus: FC = () => {
  const [pbxStatus, setPBXStatus] = useState<TAgentStatus['data']>('offline')
  const { dispatch } = useRedux()

  useEffect(() => {
    const getStatusAsync = async () => {
      try {
        const { data } = await apiAgents.getAgentStatus()
        setPBXStatus(data.data)
      } catch (e) {
        handleRestError({ e, dispatch })
      }
    }
    getStatusAsync()
    const interval = setInterval(getStatusAsync, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const statusColors = (status: TAgentStatus['data']): keyof TPalette => {
    if (status === 'offline') return 'main25'
    if (status === 'online') return 'main26'
    if (status === 'oncall') return 'main14'
    if (status === 'ringing') return 'main10'
    if (status === 'manual_pause') return 'main17'
    if (status === 'system_pause') return 'main16'
    return 'main20'
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
        {pbxStatus
          .split('_')
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
          .join(' ')}
      </Text>
    </Box>
  )
}
