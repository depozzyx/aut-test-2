import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TResetPasswordReq } from '@/api-rest/auth/types'
import { apiAuth } from '@/api-rest/auth'
import { handleActionErrors } from '@/utils/handle-action-errors'
import { TFormPropsAsync } from '@peiko/types/formik'
import { ERROR_STATUS } from '@/constants/error-status'

export type TInit = {
  step: null | 'success' | 'error' | 'invalidToken'
  isLoading: boolean
}

const init: TInit = {
  step: null,
  isLoading: false,
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setStep, setIsLoading } = resetPassword.actions

export const selectResetPassword: TSelector<TInit> = (state) => state.resetPassword

export default resetPassword.reducer

export const resetPasswordAsync =
  ({
    formData,
    token,
    formik,
  }: TFormPropsAsync<Omit<TResetPasswordReq, 'token'>> & {
    token: string
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))

      await apiAuth.resetPassword({ ...formData, token })

      dispatch(setStep('success'))
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        additionalConditions: (status) => {
          if (status === ERROR_STATUS.MESSAGE) {
            dispatch(setStep('error'))
            return true
          }
        },
        formik,
      })
    } finally {
      dispatch(setIsLoading(false))
      formik?.setSubmitting(false)
    }
  }
