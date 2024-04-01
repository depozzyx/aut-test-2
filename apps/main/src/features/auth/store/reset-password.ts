import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TResetPasswordReq } from '@/api-rest/auth/types'
import { apiAuth } from '@/api-rest/auth'
import { handleActionErrors } from '@/utils/handle-action-errors'
import { TFormPropsAsync } from '@peiko/types/formik'

export type TInit = {
  isLoading: boolean
  statusCode: number | string
}

const init: TInit = {
  isLoading: false,
  statusCode: '',
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState: init,
  reducers: {
    setStatusCode(state, action: PayloadAction<TInit['statusCode']>) {
      state.statusCode = action.payload
    },
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setIsLoading, setStatusCode } = resetPassword.actions

export const selectResetPassword: TSelector<TInit> = (state) => state.resetPassword

export default resetPassword.reducer

export const resetPasswordAsync =
  ({ formData, formik }: TFormPropsAsync<TResetPasswordReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiAuth.resetPassword(formData)
      dispatch(setStatusCode(data.statusCode))
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
