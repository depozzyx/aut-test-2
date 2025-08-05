import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'
import { TManager, TManagerOrderBy, TManagersReq } from '@/api-rest/manager/types'
import { managerApi } from '@/api-rest/manager'
import { modalsActions } from '@/features/common/modals'
import { handleRestError } from '@/features/common/error'
import { ORDER } from '@/constants/order'

import { calculateNewPage } from '@/utils/pagination'
import { notificationActions } from '../../common/notifications/store'

export type TInit = {
  isLoading: boolean
  pagination: TPagination
  managersList: TManager[] | []
  selectedId: number | null
  orderBy?: TManagerOrderBy
  order?: TOrder
  deletedManagerData?: TManager
  searchTerm: string
}

const init: TInit = {
  isLoading: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  managersList: [],
  selectedId: null,
  orderBy: undefined,
  order: undefined,
  deletedManagerData: undefined,
  searchTerm: '',
}

const managers = createSlice({
  name: 'managers',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
      // ASC => DESC => clear
      if (action.payload === state.orderBy) {
        if (state.order === ORDER.ASC) {
          state.order = ORDER.DESC
        } else if (state.order === ORDER.DESC) {
          state.orderBy = undefined
          state.order = undefined
        }
      } else {
        state.orderBy = action.payload
        state.order = ORDER.ASC
      }
    },
    setOrder(state, action: PayloadAction<TInit['order']>) {
      state.order = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = calculateNewPage(action.payload)
    },
    setSearchTerm(state, action: PayloadAction<TInit['searchTerm']>) {
      state.searchTerm = action.payload
    },
    setManagersList(state, action: PayloadAction<TInit['managersList']>) {
      state.managersList = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setDeletedManagerData(state, action: PayloadAction<TInit['deletedManagerData']>) {
      state.deletedManagerData = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setManagersList,
  setOrderBy,
  setOrder,
  setSelectedId,
  reset,
  setDeletedManagerData,
  setSearchTerm,
} = managers.actions

export const selectManagers: TSelector<TInit> = (state) => state.managers

export const selectOrderBy = createSelector(selectManagers, ({ orderBy }) => orderBy)
export const selectOrder = createSelector(selectManagers, ({ order }) => order)

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
export const selectIsLoading = createSelector(selectManagers, (state) => state.isLoading)

export const selectSelectedManager = createSelector(
  selectManagers,
  ({ selectedId, managersList }) => managersList.find(({ id }) => id === selectedId),
)
export const selectSearchTerm = createSelector(
  selectManagers,
  ({ searchTerm }) => searchTerm,
)
export default managers.reducer

export const asyncGetManagerList =
  (params: TManagersReq, onsuccess?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await managerApi.getManagers(params)
      dispatch(setManagersList(data.data))
      dispatch(setPagination(data.pagination))
      dispatch(modalsActions.resetModalsState())
      onsuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncRemoveManager =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data },
      } = await managerApi.deleteManager(id)
      dispatch(setDeletedManagerData(data))
      dispatch(modalsActions.resetModalsState())
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:manager.success-delete',
          status: 'success',
          values: { managerName: data.username ?? '' },
        }),
      )
      dispatch(
        asyncGetManagerList({
          page: 1,
          limit: 10,
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
