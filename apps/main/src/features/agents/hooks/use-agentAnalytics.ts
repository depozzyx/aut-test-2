import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { apiAgentAnalytics } from '@/api-rest/agent-analytics'
import { TAgentAnalyticsReqParams } from '@/api-rest/agent-analytics/types'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  selectAgentNameFilter,
  selectDateFilter,
} from '@/features/agents/store/agent-analytics'
import { handleRestError } from '@/features/common/error'
import {
  mockAverageCallDuration,
  mockCallSuccess,
  mockTimeOnline,
  mockAvailabilityOnline,
} from '@/features/agents/mocks/analytics'
import { TSimpleChartData } from '@/components/charts/types'
import { TCallSuccessChartData } from '../containers/charts/CallSuccess/components/types'

type TReturn = {
  isLoading: boolean
  averageCallDuration: TSimpleChartData[] | []
  callSuccess: TCallSuccessChartData[] | []
  timeOnline: TSimpleChartData[] | []
  availabilityOnline: TSimpleChartData[] | []
}

export const useAgentAnalytics = (): TReturn => {
  const [averageCallDuration, setAverageCallDuration] = useState<
    TReturn['averageCallDuration'] | []
  >([])
  const [callSuccess, setCallSuccess] = useState<TReturn['callSuccess'] | []>([])
  const [timeOnline, setTimeOnline] = useState<TReturn['timeOnline'] | []>([])
  const [availabilityOnline, setAvailabilityOnline] = useState<
    TReturn['availabilityOnline'] | []
  >([])

  const { select, dispatch } = useRedux()

  const { agentNameFilter: id, dateFilter } = select(
    createStructuredSelector({
      agentNameFilter: selectAgentNameFilter,
      dateFilter: selectDateFilter,
    }),
    shallowEqual,
  )

  const fetcher = useCallback((id: number, params: TAgentAnalyticsReqParams) => {
    if (!id) return null
    return apiAgentAnalytics.getAgentAnalytics(id, params).then((res) => res.data)
  }, [])

  const key = useMemo(() => `/analytics/agent/${id}`, [id])

  const { isLoading } = useSWR(
    [key, id, dateFilter.fromDate, dateFilter.toDate],
    () =>
      fetcher(id as number, { fromDate: dateFilter.fromDate, toDate: dateFilter.toDate }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
        console.log('data useSWR', data)

        setAverageCallDuration(mockAverageCallDuration)
        setCallSuccess(mockCallSuccess)
        setTimeOnline(mockTimeOnline)
        setAvailabilityOnline(mockAvailabilityOnline)
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  return {
    isLoading,
    averageCallDuration,
    callSuccess,
    timeOnline,
    availabilityOnline,
  }
}
