import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { dateToString } from '@/utils/date-to-string'
import { useRedux } from '@/hooks/use-redux'

import { Flex } from '@/components/Flex'
import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import { Loader } from '@peiko/components/loaders/Loader'
import { AgentNameFilter } from './containers/filters/AgentNameFilter'
import { useAgentAnalytics } from './hooks/use-agentAnalytics'
import { setDateFilter } from './store/agent-analytics'

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
    loading: () => <Loader />,
  },
)

const AvailabilityOnline = dynamic(
  () =>
    import('./containers/charts/AvailabilityOnline').then(
      (mod) => mod.AvailabilityOnline,
    ),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

const AverageCallDuration = dynamic(
  () =>
    import('./containers/charts/AverageCallDuration').then(
      (mod) => mod.AverageCallDuration,
    ),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

export const AgentAnalytics = (): JSX.Element => {
  const { dispatch } = useRedux()

  useAgentAnalytics()

  const handleChangeDate = useCallback((date: { from?: Date; to?: Date }) => {
    const copyFilters = {
      ...(date?.from && { fromDate: dateToString(date.from) ?? undefined }),
      ...(date?.to && { toDate: dateToString(date.to) ?? undefined }),
    }

    if (Object.keys(copyFilters).length > 0) {
      dispatch(setDateFilter(copyFilters))
    }
  }, [])

  return (
    <Flex padding="12px 0 0 0" width="100%">
      <Flex direction="column" gap={12} margin="0 auto" maxWidth={844} width="100%">
        <Flex className="configure-panel" gap={16}>
          <RangeDayPicker onChange={handleChangeDate} />
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
