import useSWR from 'swr'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import {
  selectOrder,
  selectPagination,
  setApiKeysList,
  setPagination,
} from '@/features/settings/store/api-key'
import { managerApi } from '@/api-rest/manager'
import { TManagersReq } from '@/api-rest/manager/types'

type TReturn = {
  isLoading: boolean
}

export const useApiKeysList = (): TReturn => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit },
    order,
  } = select(
    createStructuredSelector({
      pagination: selectPagination,
      order: selectOrder,
    }),
    shallowEqual,
  )

  const fetcher = (params: TManagersReq) =>
    managerApi.getManagerApiKey(params).then((res) => res.data)

  const { isLoading } = useSWR(
    ['/manager/api-key', page, limit, order],
    () =>
      fetcher({
        page,
        limit,
        order,
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
