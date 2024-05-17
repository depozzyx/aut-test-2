import { Flex } from '@/components/Flex'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { AgentNameFilter } from '@/features/agents/containers/filters/AgentNameFilter'
import { AverageCallDuration } from '@/features/agents/containers/charts/AverageCallDuration'
import { AvailabilityOnline } from '@/features/agents/containers/charts/AvailabilityOnline'
import { CallMinutes } from '@/features/agents/containers/charts/CallMinutes'
import { CallSuccess } from '@/features/agents/containers/charts/CallSuccess'
import { useAgentAnalytics } from './hooks/use-agentAnalytics'

export const AgentAnalytics = (): JSX.Element => {
  useAgentAnalytics()

  return (
    <Flex padding="12px 0 0 0" width="100%">
      <Flex direction="column" gap={12} margin="0 auto" maxWidth={844} width="100%">
        <Flex className="configure-panel" gap={16}>
          <RangeDayPicker />
          <AgentNameFilter />
        </Flex>
        <Flex className="charts-container" direction="column" gap={20} width="100%">
          <AverageCallDuration />
          <CallSuccess />
          <CallMinutes />
          <AvailabilityOnline />
        </Flex>
      </Flex>
    </Flex>
  )
}
