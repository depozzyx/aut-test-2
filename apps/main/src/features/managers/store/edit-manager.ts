import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { mutate } from 'swr'
import { TSelector, TAsyncAction } from '@/store'
import { TManager, TUpdateManagerReq } from '@/api-rest/manager/types'
import { managerApi } from '@/api-rest/manager'
import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { TFormPropsAsync } from '@peiko/types/formik'
import { modalsActions } from '@/features/common/modals/store'
import { selectSelectedId, selectManagersList } from './managers'

export type TInit = {
  isLoading: boolean
  manager: TManager | null
}

const init: TInit = {
  isLoading: false,
  manager: null,
}

const editManager = createSlice({
  name: 'editManager',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setEditedManager(state, action: PayloadAction<TInit['manager']>) {
      state.manager = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setEditedManager, reset } = editManager.actions

export const selectEditManagerStore: TSelector<TInit> = (state) => state.editManager

export const selectEditManagerIsLoading = createSelector(
  selectEditManagerStore,
  ({ isLoading }) => isLoading,
)

export const selectEditManagerData = createSelector(
  selectEditManagerStore,
  ({ manager }) => manager,
)

export const selectInitFormData = createSelector(
  [selectSelectedId, selectManagersList],
  (selectedId, managersList) => {
    if (!selectedId || !managersList) return null

    const currentAgent = managersList.find((manager) => manager.id === selectedId)

    return {
      email: currentAgent?.email || '',
      username: currentAgent?.username || '',
    }
  },
)

export default editManager.reducer

export const asyncEditManager =
  ({
    formData,
    formik,
  }: TFormPropsAsync<TUpdateManagerReq> & {
    formik?: FormikHelpers<TUpdateManagerReq>
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await managerApi.updateManager(formData)
      dispatch(setEditedManager(data.data))
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:manager.update-success',
          status: 'success',
          values: {},
        }),
      )
      mutate(['/manager/list', 1, 8, 'ASC'])
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      formik?.resetForm()
      dispatch(modalsActions.resetModalsState())
      dispatch(setIsLoading(false))
    }
  }
