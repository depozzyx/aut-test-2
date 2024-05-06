import { useCallback } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { TSortBy } from '@/api-rest/campaigns/types'
import { selectSort, setSort } from '@/features/campaigns/store/campaigns'

type TReturn = {
  handleSort: (sort: TSortBy) => void
}

export const useCampaignSort = (): TReturn => {
  const { select, dispatch } = useRedux()

  const sort = select(selectSort)

  const handleSort = useCallback(
    (sortBy: TSortBy) => {
      const isCurrentSortField = sort.sortBy === sortBy
      const newOrder = isCurrentSortField && sort.orderBy === 'ASC' ? 'DESC' : 'ASC'
      dispatch(setSort({ sortBy, orderBy: newOrder }))
    },
    [dispatch, sort],
  )

  return { handleSort }
}
