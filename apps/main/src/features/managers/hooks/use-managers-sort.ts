import { useCallback } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { TManagerSortBy } from '@/api-rest/manager/types'
import { selectSort, setSort } from '@/features/managers/store/managers'

type TReturn = (sort: TManagerSortBy) => void

export const useManagersSort = (): TReturn => {
  const { select, dispatch } = useRedux()

  const sort = select(selectSort)

  const handleSort = useCallback(
    (sortBy: TManagerSortBy) => {
      const isCurrentSortField = sort.sortBy === sortBy
      const newOrder = isCurrentSortField && sort.orderBy === 'ASC' ? 'DESC' : 'ASC'
      dispatch(setSort({ sortBy, orderBy: newOrder }))
    },
    [dispatch, sort],
  )

  return handleSort
}
