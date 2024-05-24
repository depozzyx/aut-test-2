import { useCallback } from 'react'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { ORDER_BY } from '@/constants/orderBy'
import { TOrderBy } from '@/types/entities/orderBy'
import { selectSortFilter, setSortFilter } from '@/features/managers/store/managers'

type TReturn = {
  sortOptions: { label: string; value: TOrderBy }[]
  selectedSort: TOrderBy
  setSort: (sort: TOrderBy) => void
}

export const useSortFilter = (): TReturn => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()

  const sort = select(selectSortFilter, shallowEqual)

  const handleSetSort = useCallback(
    (sort: TOrderBy) => {
      dispatch(setSortFilter(sort))
    },
    [dispatch],
  )

  const sortOptions = [
    { label: t('ASC'), value: ORDER_BY.ASC },
    { label: t('DESC'), value: ORDER_BY.DESC },
  ]

  return {
    sortOptions,
    selectedSort: sort,
    setSort: handleSetSort,
  }
}
