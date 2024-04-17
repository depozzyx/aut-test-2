import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

export type TInit = {
  formData: Record<string, unknown>
}

const init: TInit = {
  formData: {},
}

const editCampaign = createSlice({
  name: 'editCampaign',
  initialState: init,
  reducers: {
    setFormData(state, action: PayloadAction<Record<string, unknown>>) {
      state.formData = action.payload
    },
    reset: () => init,
  },
})

// actions
export const { reset, setFormData } = editCampaign.actions
// selectors

export const selectEditCampaign: TSelector<TInit> = (state) => state.editCampaign

export const selectEditCampaignFormData: TSelector<Record<string, unknown>> =
  createSelector(selectEditCampaign, (state) => state.formData)

export default editCampaign.reducer
