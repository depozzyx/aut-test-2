import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TNotification } from '../types'

export type TInit = {
  notification: TNotification | null
}

const init: TInit = {
  notification: null,
}

const notifications = createSlice({
  name: 'notifications',
  initialState: init,
  reducers: {
    setNotification(state, action: PayloadAction<TNotification>) {
      state.notification = action.payload
    },
    resetNotifications(state) {
      state.notification = null
    },
  },
})

// actions
export const notificationActions = notifications.actions
// selectors
export const selectNotifications: TSelector<TInit> = (state) => state.notifications

export default notifications.reducer
