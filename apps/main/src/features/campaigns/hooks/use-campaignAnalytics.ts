import { useEffect, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { handleRestError } from '@/features/common/error'
import { apiCampaignAnalytics } from '@/api-rest/campaign-analytics'
import { TCampaignAnalyticsReqParams } from '@/api-rest/campaign-analytics/types'
import { useRedux } from '@/hooks/use-redux'
import {
  selectDateFilter,
  setIsLoading,
  setAnalyticsData,
} from '@/features/campaigns/store/campaign-analytics'
import { selectFilterCampaignIds } from '@/features/campaigns/store/campaigns'

export const useCampaignAnalytics = (): undefined => {
  const { select, dispatch } = useRedux()

  const { filterCampaignIds: ids, dateFilter } = select(
    createStructuredSelector({
      filterCampaignIds: selectFilterCampaignIds,
      dateFilter: selectDateFilter,
    }),
    shallowEqual,
  )

  const fetcher = useCallback((id: number, params: TCampaignAnalyticsReqParams) => {
    if (!id) return null
    return apiCampaignAnalytics.getCampaignAnalytics(id, params).then((res) => res.data)
  }, [])

  const key = useMemo(() => `/analytics/campaign/${ids[0]}`, [ids[0]])

  const { isLoading } = useSWR(
    [key, ids, dateFilter.fromDate, dateFilter.toDate],
    () => fetcher(ids[0], { fromDate: dateFilter.fromDate, toDate: dateFilter.toDate }),
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
