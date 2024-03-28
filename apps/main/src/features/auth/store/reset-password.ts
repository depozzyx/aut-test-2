import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

export type TInit = {
  isLoading: boolean
}

const init: TInit = {
  isLoading: false,
}

const resetPassword = createSlice({
  name: 'resetPassword',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    reset: () => init,
  },
})

export const { reset, setIsLoading } = resetPassword.actions

export const selectResetPassword: TSelector<TInit> = (state) => state.resetPassword

export default resetPassword.reducer
