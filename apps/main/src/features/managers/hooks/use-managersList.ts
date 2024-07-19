import useSWR from 'swr'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { TManagersReq } from '@/api-rest/manager/types'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { managerApi } from '@/api-rest/manager'
import {
  selectSort,
  selectPagination,
  setManagersList,
  setPagination,
} from '@/features/managers/store/managers'

type TReturn = {
  isLoading: boolean
}

export const useManagerList = (): TReturn => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit },
    sort,
  } = select(
    createStructuredSelector({
      pagination: selectPagination,
      sort: selectSort,
    }),
    shallowEqual,
  )

  const fetcher = (params: TManagersReq) =>
    managerApi.getManagers(params).then((res) => res.data)

  const { isLoading } = useSWR(
    ['/manager/list', page, limit, sort.sortBy, sort.orderBy],
    () =>
      fetcher({
        page,
        limit,
        orderBy: sort.orderBy,
        sortBy: sort.sortBy,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        dispatch(setManagersList(data.data))
        dispatch(setPagination(data.pagination))
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )
  return { isLoading }
}
