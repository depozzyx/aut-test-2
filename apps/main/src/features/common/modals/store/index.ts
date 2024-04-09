import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TModal } from '../types'

export type TInit = {
  modalState: null | TModal
}

const init: TInit = {
  modalState: null,
}

const modals = createSlice({
  name: 'modals',
  initialState: init,
  reducers: {
    setModal(state, action: PayloadAction<TModal>) {
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
export const selectModal: TSelector<TInit> = (state) => state.modals

export default modals.reducer
