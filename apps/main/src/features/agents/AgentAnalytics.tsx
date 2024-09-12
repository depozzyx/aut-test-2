import dynamic from 'next/dynamic'

import { Flex } from '@/components/Flex'
import { AgentNameFilter } from './containers/filters/AgentNameFilter'
import { useAgentAnalytics } from './hooks/use-agentAnalytics'

const RangeDayPicker = dynamic(
  () => import('@/inputs/RangeDayPicker').then((mod) => mod.RangeDayPicker),
  {
    ssr: false,
  },
)

const CallMinutes = dynamic(
  () => import('./containers/charts/CallMinutes').then((mod) => mod.CallMinutes),
  {
    ssr: false,
  },
)

const CallSuccess = dynamic(
  () => import('./containers/charts/CallSuccess').then((mod) => mod.CallSuccess),
  {
    ssr: false,
  },
)

const AvailabilityOnline = dynamic(
  () =>
    import('./containers/charts/AvailabilityOnline').then(
      (mod) => mod.AvailabilityOnline,
    ),
  {
    ssr: false,
  },
)

const AverageCallDuration = dynamic(
  () =>
    import('./containers/charts/AverageCallDuration').then(
      (mod) => mod.AverageCallDuration,
    ),
  {
    ssr: false,
  },
)

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
