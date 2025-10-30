import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRedux } from '@/hooks/use-redux'
import { INITIAL_REQUEST_PARAMS } from '@/features/campaigns/constants'
import {
  asyncGetUsersList,
  selectUsersOptions,
  selectUsersPagination,
} from '@/features/users/store/users'
import { ERoles } from '@/constants/profile'
import { OptionsLoader } from '../types'

export const useUserLoader = (
  role: ERoles,
  predefinedOptions: { value: number | undefined; label: string }[] = [],
): OptionsLoader => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit, total },
    options,
  } = select(
    createStructuredSelector({
      pagination: selectUsersPagination,
      options: selectUsersOptions,
    }),
    shallowEqual,
  )

  const [search, setSearch] = useState<string>()

  // Initial load
  useEffect(() => {
    dispatch(asyncGetUsersList(role, INITIAL_REQUEST_PARAMS))
  }, [dispatch, role])

  // Debounced search
  useDebounce(
    () => {
      if (search === undefined) return
      dispatch(
        asyncGetUsersList(
          ERoles.AGENT,
          {
            page: 1,
            limit,
            search,
          },
          false,
          false,
        ),
      )
    },
    400,
    [search, limit, dispatch],
  )

  // Infinite scroll
  const onScrollBottom = useCallback(() => {
    const lastPage = total === 0 ? 1 : Math.ceil(total / (limit ?? 10))
    if (page < lastPage) {
      dispatch(
        asyncGetUsersList(
          ERoles.AGENT,
          {
            page: page + 1,
            limit,
            search,
          },
          true,
          true,
        ),
      )
    }
  }, [page, limit, total, search, dispatch])

  const reload = () => {
    dispatch(asyncGetUsersList(role, INITIAL_REQUEST_PARAMS))
  }

  return {
    options: predefinedOptions.concat(options),
    loadMore: onScrollBottom,
    setSearch,
    reload,
  }
}
