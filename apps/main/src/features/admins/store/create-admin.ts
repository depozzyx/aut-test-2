import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { TSelector, TAsyncAction } from '@/store'

import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { TFormPropsAsync } from '@peiko/types/formik'
import { modalsActions } from '@/features/common/modals'
import { TAdmin, TCreateAdminReq } from '@/api-rest/admin/types'
import { adminApi } from '@/api-rest/admin'

export type TInit = {
  isLoading: boolean
  admin: TAdmin | null
}

const init: TInit = {
  isLoading: false,
  admin: null,
}

const createAdmin = createSlice({
  name: 'createAdmin',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setCreatedAdmin(state, action: PayloadAction<TInit['admin']>) {
      state.admin = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setCreatedAdmin, reset } = createAdmin.actions

export const selectCreateAdminStore: TSelector<TInit> = (state) => state.createAdmin

export const selectCreateAdminIsLoading = createSelector(
  selectCreateAdminStore,
  ({ isLoading }) => isLoading,
)

export const selectCreatedAdminData = createSelector(
  selectCreateAdminStore,
  ({ admin }) => admin,
)

export default createAdmin.reducer

export const asyncCreateAdmin =
  (
    {
      formData,
      formik,
    }: TFormPropsAsync<TCreateAdminReq> & {
      formik?: FormikHelpers<TCreateAdminReq>
    },
    onsuccess?: () => void,
  ): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const payload = { ...formData }
      const { data } = await adminApi.createAdmin(payload)
      dispatch(setCreatedAdmin(data.data))
      const name = data.data.username
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:admin.create-success',
          status: 'success',
          values: { name },
        }),
      )
      formik?.resetForm()
      dispatch(reset())
      dispatch(modalsActions.resetModalsState())
      onsuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
