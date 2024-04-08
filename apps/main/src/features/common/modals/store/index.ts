import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TModals } from '../types'

export type TInit = {
  modalState: null | TModals
}

const init: TInit = {
  modalState: null,
}

const modals = createSlice({
  name: 'modals',
  initialState: init,
  reducers: {
    setModal(state, action: PayloadAction<TModals>) {
      state.modalState = action.payload
    },
    resetModalsState(state) {
      state.modalState = null
    },
  },
})

// actions
export const modalsActions = modals.actions
// selectors
export const selectModals: TSelector<TInit> = (state) => state.modals

export default modals.reducer
