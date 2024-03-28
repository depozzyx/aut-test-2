import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

export type TInit = {
  step: null | 'success' | 'error'
  isLoading: boolean
}

const init: TInit = {
  step: null,
  isLoading: false,
}

const changePassword = createSlice({
  name: 'changePassword',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setStep } = changePassword.actions

export const selectChangePassword: TSelector<TInit> = (state) => state.changePassword
export default changePassword.reducer
