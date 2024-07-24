import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { TCampaignLogsReq } from '@/api-rest/campaign-log/types'
import { campaignLogsApi } from '@/api-rest/campaign-log'
import useSWR from 'swr'
import { handleRestError } from '@/features/common/error'
import { groupLogsByDate } from '@/features/activityLog/utils/groupLogsByDate'
import {
  selectLogPagination,
  selectParams,
  setLogsData,
  setPagination,
} from '../../store/campaign-log'

type TReturn = {
  isLoading: boolean
}

export function useFetchCampaignLogs(): TReturn {
  const { dispatch, select } = useRedux()

  const { params, pagination } = select(
    createStructuredSelector({
      params: selectParams,
      pagination: selectLogPagination,
    }),
    shallowEqual,
  )

  const fetcher = (params: TCampaignLogsReq) =>
    campaignLogsApi.getCampaignLogs(params).then((response) => response.data)

  const { isLoading } = useSWR(
    ['/campaign-logs', pagination.page, pagination.limit, ...Object.values(params)],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
        ...params,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        dispatch(setLogsData(groupLogsByDate(data.data)))
        dispatch(setPagination(data.pagination))
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  return { isLoading }
}
