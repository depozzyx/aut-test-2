import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { handleRestError } from '@/features/common/error'
import { FormikHelpers } from 'formik'
import { TFormPropsAsync } from '@peiko/types/formik'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals'
import { TResponse } from '@peiko/types/handle-rest-error'
import { ERoles } from '@/constants/profile'
import { TUser } from '@/api-rest/users/types'
import { apiUsers } from '@/api-rest/users'
import { TUserFormData } from '../types'

export type TInit = {
  isLoading: boolean
  createdUserData: null | TUser
}

const init: TInit = {
  isLoading: false,
  createdUserData: null,
}

const createUser = createSlice({
  name: 'createUser',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setCreatedUserData(state, action: PayloadAction<TInit['createdUserData']>) {
      state.createdUserData = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, reset, setCreatedUserData } = createUser.actions

export const selectCreateUser: TSelector<TInit> = (state) => state.createUser

export const selectCreateUserIsLoading = createSelector(
  selectCreateUser,
  ({ isLoading }) => isLoading,
)

export default createUser.reducer

export const asyncCreateUser =
  (
    {
      role,
      formData,
      formik,
    }: TFormPropsAsync<TUserFormData> & {
      role: ERoles
      formik?: FormikHelpers<TUserFormData>
    },
    onsuccess?: () => void,
    onerror?: (status: number, data: TResponse<any>) => boolean | void,
  ): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))

      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        hideLeadPhones: formData?.hideLeadPhones === 'true',
      }
      const { data } = await apiUsers.createUser(role, dataToSend)
      dispatch(setCreatedUserData(data.data))
      const userName = data.data.username
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:user.create-success',
          status: 'success',
          values: { userName, role },
        }),
      )
      formik?.resetForm()
      dispatch(reset())
      dispatch(modalsActions.resetModalsState())
      onsuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch, formik, custom: onerror })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
