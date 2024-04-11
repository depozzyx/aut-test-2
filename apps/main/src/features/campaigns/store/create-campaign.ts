import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

export type TInit = {
  formData: Record<string, unknown>
}

const init: TInit = {
  formData: {},
}

const createCampaign = createSlice({
  name: 'createCampaign',
  initialState: init,
  reducers: {
    setFormData(state, action: PayloadAction<Record<string, unknown>>) {
      state.formData = action.payload
    },
    reset: () => init,
  },
})

// actions
export const { reset, setFormData } = createCampaign.actions
// selectors

export const selectCreateCampaign: TSelector<TInit> = (state) => state.createCampaign

export const selectCreateCampaignFormData: TSelector<Record<string, unknown>> =
  createSelector(selectCreateCampaign, (state) => state.formData)

export default createCampaign.reducer
