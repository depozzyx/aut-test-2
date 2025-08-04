import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'

import { TAgentCalls } from '@/api-rest/campaigns/types'
import { useTheme } from 'styled-components'
import React from 'react'

type Props = {
  agentsCalls: TAgentCalls[]
}

export const CampaignAgentsCalls = ({ agentsCalls }: Props): JSX.Element => {
  const theme = useTheme()

  return (
    <Flex
      direction="column"
      align="center"
      styles={{
        width: '100%',
        maxWidth: '400px',
        maxHeight: '266px',
        overflowY: 'auto',
      }}
    >
      {agentsCalls.map((item) => (
        <Flex
          key={item.userId}
          justify="start"
          gap="10"
          styles={{
            display: 'flex',
            width: '100%',
            padding: '8px 0',
            borderBottom: `1px solid ${theme.palette.main22}`,
          }}
        >
          <Flex
            styles={{
              flex: '1',
              textAlign: 'start',
            }}
          >
            <Text variant="f8">{item.agentName}</Text>
          </Flex>
          <Flex
            styles={{
              flex: '1',
              textAlign: 'start',
            }}
          >
            <Text variant="f8">{item.total}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
