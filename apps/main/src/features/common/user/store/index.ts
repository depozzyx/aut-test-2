import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import Router from 'next/router'
import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { apiAuth } from '@/api-rest/auth'
import { authorized } from '@/browser-api/authorized'
import { apiProfile } from '@/api-rest/profile'
import { TProfile } from '@/types/entities/profile'
// import { ROUTES } from '@/constants/routes'

export type TInit = {
  userFetching: boolean
  loading: boolean
  user: TProfile | null
}

const init: TInit = {
  userFetching: true,
  loading: false,
  user: null,
}

const userState = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setUser(state, action: PayloadAction<TInit['user']>) {
      state.user = action.payload
    },
    setUserFetching(state, action: PayloadAction<boolean>) {
      state.userFetching = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    removeUser(state) {
      state.user = null
    },
  },
})

// actions
const { setUser, setUserFetching, setLoading, removeUser } = userState.actions
// selectors
const userSelector: TSelector<TInit> = (state) => state.user

const setUserData =
  (userData: TInit['user']): TAsyncAction =>
  async (dispatch) => {
    dispatch(setUser(userData))
    if (userData?.role) {
      authorized.set()
    }
  }

const getProfile = (): TAsyncAction => async (dispatch) => {
  try {
    if (!authorized.get()) {
      dispatch(setUserFetching(false))
      return
    }
    const { data } = await apiProfile.get()
    dispatch(setUser(data.data))
  } catch (e) {
    handleRestError({
      e,
      dispatch,
    })
  } finally {
    dispatch(setUserFetching(false))
  }
}

const logout = (): TAsyncAction => (dispatch) => {
  authorized.remove()
  dispatch(removeUser())
}

export const logoutAsync = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(setLoading(true))

    await apiAuth.logout()
    authorized.remove()
    dispatch(removeUser())
    // ToDO: check if it's necessary
    // Router.push(ROUTES.LOGOUT)
  } catch (e) {
    handleRestError({ e, dispatch })
  } finally {
    dispatch(setLoading(false))
  }
}

export const userActions = { getProfile, logout, logoutAsync, setUserData }
export const userSelectors = { user: userSelector }
export default userState.reducer
