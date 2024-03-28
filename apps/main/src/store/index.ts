import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import errorReducer from '@/features/common/error/store'
import userReducer from '@/features/common/user/store'
import signInReducer from '@/features/auth/store/sign-in'
import resetPasswordReducer from '@/features/auth/store/reset-password'
import changePasswordReducer from '@/features/auth/store/change-password'

const store = configureStore({
  reducer: {
    error: errorReducer,
    user: userReducer,
    signIn: signInReducer,
    resetPassword: resetPasswordReducer,
    changePassword: changePasswordReducer,
  },
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
