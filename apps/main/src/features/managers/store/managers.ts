import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { ORDER_BY } from '@/constants/orderBy'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import { TManager } from '@/api-rest/manager/types'

export type TInit = {
  isLoading: boolean
  sortFilter: TOrderBy
  pagination: TPagination
  managersList: TManager[] | []
  selectedId: number | null
}

const init: TInit = {
  isLoading: false,
  sortFilter: ORDER_BY.ASC,
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  managersList: [],
  selectedId: null,
}

const managers = createSlice({
  name: 'managers',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setSortFilter(state, action: PayloadAction<TInit['sortFilter']>) {
      state.sortFilter = action.payload
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
  setSortFilter,
  setSelectedId,
  reset,
} = managers.actions

export const selectManagers: TSelector<TInit> = (state) => state.managers

export const selectSortFilter = createSelector(
  selectManagers,
  (state) => state.sortFilter,
)

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
