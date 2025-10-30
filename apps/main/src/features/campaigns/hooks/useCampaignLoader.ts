import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useRedux } from '@/hooks/use-redux'
import { INITIAL_REQUEST_PARAMS } from '@/features/campaigns/constants'

import { OptionsLoader } from '../types'

import {
  asyncGetCampaignsList,
  selectCampaignsAsOptions,
  selectCampaignsPagination,
} from '../store/campaigns'
import { TActiveCampaignsReq } from '../../../api/rest/campaigns/types'

export const useCampaignLoader = (
  predefinedOptions: { value: number | undefined; label: string }[] = [],
  filter: Partial<TActiveCampaignsReq> = {},
): OptionsLoader => {
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit, total },
    options,
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      options: selectCampaignsAsOptions,
    }),
    shallowEqual,
  )

  const [search, setSearch] = useState<string>()

  // Initial load
  useEffect(() => {
    dispatch(asyncGetCampaignsList({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }, [dispatch])

  // Debounced search
  useDebounce(
    () => {
      if (search === undefined) return
      dispatch(
        asyncGetCampaignsList(
          {
            page: 1,
            limit,
            search,
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
        asyncGetCampaignsList(
          {
            page: page + 1,
            limit,
            search,
            ...filter,
          },
          true,
          true,
        ),
      )
    }
  }, [page, limit, total, search, dispatch])

  const reload = () => {
    dispatch(asyncGetCampaignsList({ ...INITIAL_REQUEST_PARAMS, ...filter }))
  }

  return {
    options: predefinedOptions.concat(options),
    loadMore: onScrollBottom,
    setSearch,
    reload,
  }
}
