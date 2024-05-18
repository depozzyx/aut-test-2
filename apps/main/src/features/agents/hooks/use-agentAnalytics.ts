import { useEffect, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { apiAgentAnalytics } from '@/api-rest/agent-analytics'
import { TAgentAnalyticsReqParams } from '@/api-rest/agent-analytics/types'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  selectAgentNameFilter,
  selectDateFilter,
  setIsLoading,
  setAnalyticsData,
} from '@/features/agents/store/agent-analytics'
import { handleRestError } from '@/features/common/error'

export const useAgentAnalytics = (): undefined => {
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
        if (!data) return
        dispatch(setAnalyticsData(data.data))
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  useEffect(() => {
    dispatch(setIsLoading(isLoading))
  }, [isLoading, dispatch])
}
