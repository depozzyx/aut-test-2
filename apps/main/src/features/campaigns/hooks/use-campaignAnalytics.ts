import { useEffect, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { apiCampaignAnalytics } from '@/api-rest/campaign-analytics'
import { TCampaignAnalyticsReqParams } from '@/api-rest/campaign-analytics/types'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { handleRestError } from '@/features/common/error'
import {
  selectDateFilter,
  setIsLoading,
  setAnalyticsData,
} from '@/features/campaigns/store/campaign-analytics'
import { selectFilterCampaignName } from '@/features/campaigns/store/campaigns'

export const useCampaignAnalytics = (): undefined => {
  const { select, dispatch } = useRedux()

  const { campaignNameFilter: id, dateFilter } = select(
    createStructuredSelector({
      campaignNameFilter: selectFilterCampaignName,
      dateFilter: selectDateFilter,
    }),
    shallowEqual,
  )

  const fetcher = useCallback((id: number, params: TCampaignAnalyticsReqParams) => {
    if (!id) return null
    return apiCampaignAnalytics.getCampaignAnalytics(id, params).then((res) => res.data)
  }, [])

  const key = useMemo(() => `/analytics/campaign/${id}`, [id])

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
