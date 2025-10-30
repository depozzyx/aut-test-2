import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRedux } from '@/hooks/use-redux'
import { INITIAL_REQUEST_PARAMS } from '@/features/campaigns/constants'

import { TRoutesListReq } from '@/api-rest/routes/types'
import { OptionsLoader } from '../types'
import {
  asyncFetchRoutes,
  selectRoutesList,
  selectRoutesPagination,
} from '../../routes/store/routes'

export const useRoutesLoader = (
  predefinedOptions: { value: number | undefined; label: string }[] = [],
  filter: Partial<TRoutesListReq> = {},
): OptionsLoader => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit, total },
    options,
  } = select(
    createStructuredSelector({
      pagination: selectRoutesPagination,
      options: selectRoutesList,
    }),
    shallowEqual,
  )

  const [search, setSearch] = useState<string>()

  // Initial load
  useEffect(() => {
    dispatch(asyncFetchRoutes({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }, [dispatch])

  // Debounced search
  useDebounce(
    () => {
      if (search === undefined) return
      dispatch(
        asyncFetchRoutes(
          {
            page: 1,
            limit,
            name: search,
            ...filter,
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
        asyncFetchRoutes(
          {
            page: page + 1,
            limit,
            name: search,
            ...filter,
          },
          true,
          true,
        ),
      )
    }
  }, [page, limit, total, search, dispatch])

  const reload = () => {
    dispatch(asyncFetchRoutes({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }

  return {
    options: predefinedOptions.concat(
      options.map(({ id, name }) => ({ value: id, label: name })),
    ),
    loadMore: onScrollBottom,
    setSearch,
    reload,
  }
}
