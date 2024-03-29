import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { TSelector, TAsyncAction } from '@/store'
import { handleActionErrors } from '@/utils/handle-action-errors'
import { apiAuth } from '@/api-rest/auth'
import { TFormPropsAsync } from '@peiko/types/formik'
import { TLoginReq } from '@/api-rest/auth/types'
import { userActions } from '@/features/common/user'

export type TInit = {
  isLoading: boolean
}

export const init: TInit = {
  isLoading: false,
}

const signIn = createSlice({
  name: 'signIn',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setIsLoading } = signIn.actions

export const selectSignIn: TSelector<TInit> = (state) => state.signIn

export default signIn.reducer

export const signInAsync =
  ({
    formData,
    formik,
  }: Omit<TFormPropsAsync<TLoginReq>, 'formik'> & {
    formik?: FormikHelpers<TLoginReq>
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiAuth.login(formData)
      dispatch(userActions.setUserData(data.data))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        formik,
      })
    } finally {
      dispatch(setIsLoading(false))
      formik?.setSubmitting(false)
    }
  }
