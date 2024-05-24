import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { TSelector, TAsyncAction } from '@/store'
import { TManager, TPostManagerReq } from '@/api-rest/manager/types'
import { managerApi } from '@/api-rest/manager'
import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { TFormPropsAsync } from '@peiko/types/formik'

export type TInit = {
  isLoading: boolean
  manager: TManager | null
}

const init: TInit = {
  isLoading: false,
  manager: null,
}

const createManager = createSlice({
  name: 'createManager',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setCreatedManager(state, action: PayloadAction<TInit['manager']>) {
      state.manager = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setCreatedManager, reset } = createManager.actions

export const selectCreateManagerStore: TSelector<TInit> = (state) => state.createManager

export const selectCreateManagerIsLoading = createSelector(
  selectCreateManagerStore,
  ({ isLoading }) => isLoading,
)

export const selectCreatedManagerData = createSelector(
  selectCreateManagerStore,
  ({ manager }) => manager,
)

export default createManager.reducer

export const asyncCreateManager =
  ({
    formData,
    formik,
  }: TFormPropsAsync<TPostManagerReq> & {
    formik?: FormikHelpers<TPostManagerReq>
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await managerApi.postManager(formData)
      dispatch(setCreatedManager(data.data))
      const managerName = data.data.username
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:manager.create-success',
          status: 'success',
          values: { managerName },
        }),
      )
      formik?.resetForm()
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
