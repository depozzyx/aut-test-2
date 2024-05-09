import { useCallback } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { TAgentSortBy } from '@/features/agents/types'
import { selectSort, setSort } from '@/features/agents/store/agents'

type TReturn = {
  handleSort: (sort: TAgentSortBy) => void
}

export const useAgentSort = (): TReturn => {
  const { select, dispatch } = useRedux()

  const sort = select(selectSort)

  const handleSort = useCallback(
    (sortBy: TAgentSortBy) => {
      const isCurrentSortField = sort.sortBy === sortBy
      const newOrder = isCurrentSortField && sort.orderBy === 'ASC' ? 'DESC' : 'ASC'
      dispatch(setSort({ sortBy, orderBy: newOrder }))
    },
    [dispatch, sort],
  )

  return { handleSort }
}
