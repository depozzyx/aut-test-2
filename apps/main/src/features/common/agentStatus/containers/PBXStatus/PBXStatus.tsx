import { apiAgents } from '@/api-rest/agents'
import { TAgentStatus } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { TPalette } from '@peiko/styles/types/palette'
import React, { FC, useEffect } from 'react'
import { selectSelectedCampaignId } from '@/features/agents/store/agents'
import { BlinkingButton } from './PBXStatus.styled'
import { agentActions, agentStatusSelector } from '../../store'

export const PBXStatus: FC = () => {
  const { dispatch, select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)
  const selectedCampaignId = select(selectSelectedCampaignId)

  useEffect(() => {
    const getStatusAsync = async (campaignId: string | null) => {
      try {
        const { data } = await apiAgents.getAgentStatus({ campaignId })
        dispatch(agentActions.setPBXStatus(data.data))
      } catch (e) {
        handleRestError({ e, dispatch })
      }
    }
    // getStatusAsync(selectedCampaignId)
    const interval = setInterval(() => getStatusAsync(selectedCampaignId), 5000)
    return () => {
      clearInterval(interval)
    }
  }, [selectedCampaignId])

  const statusColors = (status: TAgentStatus['data']['status']): keyof TPalette => {
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
      <BlinkingButton bgColor={statusColors(pbxStatus.status)} />
      <Text variant="f10" tag="span" color={statusColors(pbxStatus.status)}>
        {pbxStatus.status
          .split('_')
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
          .join(' ')}
      </Text>
    </Box>
  )
}
