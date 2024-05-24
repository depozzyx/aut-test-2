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
    sortFilter,
  } = select(
    createStructuredSelector({
      pagination: selectPagination,
      sortFilter: selectSortFilter,
    }),
    shallowEqual,
  )

  const fetcher = (params: TManagersReq) =>
    managerApi.getManagers(params).then((res) => res.data)

  const { isLoading } = useSWR(
    ['/manager/list', page, limit, sortFilter],
    () =>
      fetcher({
        page,
        limit,
        orderBy: sortFilter,
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
