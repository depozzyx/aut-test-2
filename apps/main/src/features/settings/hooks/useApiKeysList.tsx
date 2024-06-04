import useSWR from 'swr'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { TManagersReq } from '@/api-rest/manager/types'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { managerApi } from '@/api-rest/manager'
import {
  selectSortFilter,
  selectPagination,
  setApiKeysList,
  setPagination,
} from '@/features/settings/store/api-key'

type TReturn = {
  isLoading: boolean
}

export const useApiKeysList = (): TReturn => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit },
    sortFilter,
  } = select(
    createStructuredSelector({
      pagination: selectPagination,
      sortFilter: selectSortFilter,
    }),
    shallowEqual,
  )

  const fetcher = (params: TManagersReq) =>
    managerApi.getManagerApiKey(params).then((res) => res.data)

  const { isLoading } = useSWR(
    ['/manager/api-key', page, limit, sortFilter],
    () =>
      fetcher({
        page,
        limit,
        orderBy: sortFilter,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        dispatch(setApiKeysList(data.data))
        dispatch(setPagination(data.pagination))
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )
  return { isLoading }
}
