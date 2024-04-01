import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TChangePasswordReq } from '@/api-rest/auth/types'
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

const changePassword = createSlice({
  name: 'changePassword',
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

export const { reset, setStep, setToken, setIsLoading } = changePassword.actions

export const selectChangePassword: TSelector<TInit> = (state) => state.changePassword
export default changePassword.reducer

export const changePasswordAsync =
  ({
    formData,
    formik,
  }: TFormPropsAsync<Omit<TChangePasswordReq, 'token'>>): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))

      const {
        changePassword: { token },
      } = getState()

      await apiAuth.changePassword({ ...formData, token })

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
