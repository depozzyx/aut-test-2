import useSWR from 'swr'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { adminApi } from '@/api-rest/admin'
import {
  selectOrderBy,
  selectOrder,
  selectPagination,
  setAdminsList,
  setPagination,
} from '@/features/admins/store/admins'
import { TAdminsReq } from '@/api-rest/admin/types'

type TReturn = {
  isLoading: boolean
}

export const useAdminsList = (): TReturn => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit },
    orderBy,
    order,
  } = select(
    createStructuredSelector({
      pagination: selectPagination,
      orderBy: selectOrderBy,
      order: selectOrder,
    }),
    shallowEqual,
  )

  const fetcher = (params: TAdminsReq) =>
    adminApi.geAdmins(params).then((res) => res.data)

  const { isLoading } = useSWR(
    ['/users/admin', page, limit, orderBy, order],
    () =>
      fetcher({
        page,
        limit,
        orderBy,
        order,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        dispatch(setAdminsList(data.data))
        dispatch(setPagination(data.pagination))
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )
  return { isLoading }
}
