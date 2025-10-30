import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRedux } from '@/hooks/use-redux'
import { INITIAL_REQUEST_PARAMS } from '@/features/campaigns/constants'

import {
  asyncGetLeadListCatalog,
  selectLeadListCatalogAsOptions,
  selectLeadListPagination,
} from '../../leads/store/lead-list'
import { OptionsLoader } from '../types'
import { TLeadListCatalogReq } from '../../../api/rest/lead-list/types'

export const useLeadListLoader = (
  predefinedOptions: { value: number | undefined; label: string }[] = [],
  filter: Partial<TLeadListCatalogReq> = {},
): OptionsLoader => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit, total },
    options,
  } = select(
    createStructuredSelector({
      pagination: selectLeadListPagination,
      options: selectLeadListCatalogAsOptions,
    }),
    shallowEqual,
  )

  const [search, setSearch] = useState<string>()

  // Initial load
  useEffect(() => {
    dispatch(asyncGetLeadListCatalog({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }, [dispatch])

  // Debounced search
  useDebounce(
    () => {
      if (search === undefined) return
      dispatch(
        asyncGetLeadListCatalog(
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
        asyncGetLeadListCatalog(
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
    dispatch(asyncGetLeadListCatalog({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }

  return {
    options: predefinedOptions.concat(options),
    loadMore: onScrollBottom,
    setSearch,
    reload,
  }
}
