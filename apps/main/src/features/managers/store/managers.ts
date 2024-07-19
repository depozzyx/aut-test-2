import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { ORDER_BY } from '@/constants/orderBy'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import { TManager, TManagerSortBy } from '@/api-rest/manager/types'

export type TInit = {
  isLoading: boolean
  pagination: TPagination
  managersList: TManager[] | []
  selectedId: number | null
  sort: { sortBy?: TManagerSortBy; orderBy: TOrderBy }
}

const init: TInit = {
  isLoading: false,
  pagination: {
    page: 1,
    limit: 8,
    total: 1,
  },
  managersList: [],
  selectedId: null,
  sort: { sortBy: undefined, orderBy: ORDER_BY.ASC },
}

const managers = createSlice({
  name: 'managers',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setSort(state, action: PayloadAction<TInit['sort']>) {
      state.sort = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setManagersList(state, action: PayloadAction<TInit['managersList']>) {
      state.managersList = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setManagersList,
  setSort,
  setSelectedId,
  reset,
} = managers.actions

export const selectManagers: TSelector<TInit> = (state) => state.managers

export const selectSort = createSelector(selectManagers, ({ sort }) => sort)

export const selectPagination = createSelector(
  selectManagers,
  (state) => state.pagination,
)

export const selectManagersList = createSelector(
  selectManagers,
  (state) => state.managersList,
)

export const selectSelectedId = createSelector(
  selectManagers,
  (state) => state.selectedId,
)

export default managers.reducer
