import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { TAsyncAction, TSelector } from '@/store'
import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'
import { ERoles } from '@/constants/profile'
import { apiUsers } from '@/api-rest/users'
import { TUpdateUserReq, TUser } from '@/api-rest/users/types'
import { TResponse } from '@/utils/handle-action-errors'
import { selectSelectedId, selectUsersList } from './users'
import { TUserFormData } from '../types'

export type TInit = {
  isLoading: boolean
  updatedUserData: null | TUser
}

const init: TInit = {
  isLoading: false,
  updatedUserData: null,
}

const editUser = createSlice({
  name: 'editUser',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setUpdatedUserData(state, action: PayloadAction<TInit['updatedUserData']>) {
      state.updatedUserData = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setUpdatedUserData, reset } = editUser.actions

export const selectUpdateUser: TSelector<TInit> = (state) => state.editUser

export const selectUpdateUserIsLoading = createSelector(
  selectUpdateUser,
  ({ isLoading }) => isLoading,
)

export const selectInitFormData = createSelector(
  [selectSelectedId, selectUsersList],
  (selectedId, usersList) => {
    if (!selectedId || !usersList) return null

    const currentUser = usersList.find((user) => user.id === selectedId)

    return {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      hideLeadPhones: currentUser?.hideLeadPhones ? 'true' : 'false',
    }
  },
)

export default editUser.reducer

export const asyncUpdateUser =
  (
    {
      role,
      formData,
      formik,
    }: {
      role: ERoles
      formData: TUserFormData
      formik?: FormikHelpers<TUserFormData>
    },
    onsuccess?: () => void,
    onerror?: (
      status: number,
      data: TResponse<Omit<TUpdateUserReq, 'id'>>,
    ) => boolean | void,
  ): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const id = getState().users.selectedId as number
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        hideLeadPhones: formData?.hideLeadPhones === 'true',
      }
      const { data } = await apiUsers.updateUser(role, id, dataToSend)
      dispatch(setUpdatedUserData(data.data))
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:user.update-success',
          status: 'success',
          values: { role },
        }),
      )
      formik?.resetForm()
      dispatch(modalsActions.resetModalsState())
      dispatch(reset())
      onsuccess?.()
    } catch (e) {
      handleRestError<Omit<TUserFormData, 'id'>>({
        e,
        dispatch,
        formik,
        custom: onerror,
      })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
