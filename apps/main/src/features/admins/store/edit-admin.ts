import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { mutate } from 'swr'

import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { TFormPropsAsync } from '@peiko/types/formik'
import { modalsActions } from '@/features/common/modals/store'
import { TAdmin, TUpdateAdmin } from '@/api-rest/admin/types'
import { adminApi } from '@/api-rest/admin'
import { selectSelectedId, selectAdminsList } from './admins'

export type TInit = {
  isLoading: boolean
  admin: TAdmin | null
}

const init: TInit = {
  isLoading: false,
  admin: null,
}

const editAdmin = createSlice({
  name: 'editAdmin',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setEditedAdmin(state, action: PayloadAction<TInit['admin']>) {
      state.admin = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setEditedAdmin, reset } = editAdmin.actions

export const selectEditAdminStore: TSelector<TInit> = (state) => state.editAdmin

export const selectEditAdminIsLoading = createSelector(
  selectEditAdminStore,
  ({ isLoading }) => isLoading,
)

export const selectEditAdminData = createSelector(
  selectEditAdminStore,
  ({ admin }) => admin,
)

export const selectInitFormData = createSelector(
  [selectSelectedId, selectAdminsList],
  (selectedId, adminsList) => {
    if (!selectedId || !adminsList) return null

    const currenAdmin = adminsList.find((admin) => admin.id === selectedId)
    if (currenAdmin) {
      return {
        email: currenAdmin.email,
        username: currenAdmin?.username || '',
        id: currenAdmin?.id || selectedId,
      }
    }
  },
)

export default editAdmin.reducer

export const asyncEditAdmin =
  ({
    formData,
    formik,
  }: TFormPropsAsync<TUpdateAdmin> & {
    formik?: FormikHelpers<TUpdateAdmin>
  }): TAsyncAction =>
  async (dispatch, getState) => {
    let error
    try {
      dispatch(setIsLoading(true))
      const adminId = getState().admins.selectedId
      const payload = {
        ...formData,
        ...(adminId && { id: adminId }),
      }
      const { data } = await adminApi.updateAdmin(payload)
      dispatch(setEditedAdmin(data.data))
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:admin.update-success',
          status: 'success',
          values: {},
        }),
      )
      dispatch(reset())
      await mutate((key) => Array.isArray(key) && key[0] === '/manager/list')
    } catch (e) {
      error = e
      handleRestError({ e, dispatch, formik })
    } finally {
      if (!error) {
        formik?.resetForm()
        dispatch(modalsActions.resetModalsState())
      }
      dispatch(setIsLoading(false))
    }
  }
