import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TOrder } from '@/types/entities/order'
import { TPagination } from '@/types/entities/pagination'
import { modalsActions } from '@/features/common/modals'
import { handleRestError } from '@/features/common/error'
import { ORDER } from '@/constants/order'

import { TAdmin, TAdminsOrderBy, TAdminsReq } from '@/api-rest/admin/types'
import { adminApi } from '@/api-rest/admin'
import { calculateNewPage } from '@/utils/pagination'
import { notificationActions } from '../../common/notifications/store'

export type TInit = {
  isLoading: boolean
  pagination: TPagination
  adminsList: TAdmin[] | []
  selectedId: number | null
  orderBy?: TAdminsOrderBy
  order?: TOrder
  deletedAdminData?: TAdmin
}

const init: TInit = {
  isLoading: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  adminsList: [],
  selectedId: null,
  orderBy: undefined,
  order: undefined,
  deletedAdminData: undefined,
}

const admins = createSlice({
  name: 'admins',
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
    setAdminsList(state, action: PayloadAction<TInit['adminsList']>) {
      state.adminsList = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setDeletedAdminData(state, action: PayloadAction<TInit['deletedAdminData']>) {
      state.deletedAdminData = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setAdminsList,
  setOrderBy,
  setOrder,
  setSelectedId,
  reset,
  setDeletedAdminData,
} = admins.actions

export const selectAdmins: TSelector<TInit> = (state) => state.admins

export const selectOrderBy = createSelector(selectAdmins, ({ orderBy }) => orderBy)
export const selectOrder = createSelector(selectAdmins, ({ order }) => order)

export const selectPagination = createSelector(selectAdmins, (state) => state.pagination)

export const selectAdminsList = createSelector(selectAdmins, (state) => state.adminsList)

export const selectSelectedId = createSelector(selectAdmins, (state) => state.selectedId)

export const selectSelectedAdmin = createSelector(
  selectAdmins,
  ({ selectedId, adminsList }) => adminsList.find(({ id }) => id === selectedId),
)

export default admins.reducer

export const asyncGetAdminsList =
  (params: TAdminsReq, onsuccess?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await adminApi.geAdmins(params)
      dispatch(setAdminsList(data.data))
      dispatch(setPagination(data.pagination))
      dispatch(modalsActions.resetModalsState())
      onsuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncRemoveAdmin =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data },
      } = await adminApi.deleteAdmin(id)
      dispatch(setDeletedAdminData(data))
      dispatch(modalsActions.resetModalsState())
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:admin.success-delete',
          status: 'success',
          values: { name: data.username ?? '' },
        }),
      )
      dispatch(
        asyncGetAdminsList({
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
