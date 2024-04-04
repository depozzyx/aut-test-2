import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TResetPasswordReq } from '@/api-rest/auth/types'
import { apiAuth } from '@/api-rest/auth'
import { handleActionErrors } from '@/utils/handle-action-errors'
import { TFormPropsAsync } from '@peiko/types/formik'
import { ERROR_STATUS } from '@/constants/error-status'

export type TInit = {
  step: null | 'success' | 'error'
  isLoading: boolean
  token: string
}

const init: TInit = {
  step: null,
  isLoading: false,
  token: '',
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setToken(state, action: PayloadAction<TInit['token']>) {
      state.token = action.payload
    },
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setStep, setToken, setIsLoading } = resetPassword.actions

export const selectResetPassword: TSelector<TInit> = (state) => state.resetPassword

export default resetPassword.reducer

export const resetPasswordAsync =
  ({
    formData,
    formik,
  }: TFormPropsAsync<Omit<TResetPasswordReq, 'token'>>): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))

      const {
        resetPassword: { token },
      } = getState()

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
