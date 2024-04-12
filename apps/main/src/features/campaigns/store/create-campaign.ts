import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { IinitialValues } from '@/features/campaigns/containers/CreateCampaignModal/components/CreateCampaignForm/CreateCampaignForm'

export type TInit = {
  formData: Record<string, unknown> | IinitialValues
}

const init: TInit = {
  formData: {},
}

const createCampaign = createSlice({
  name: 'createCampaign',
  initialState: init,
  reducers: {
    setFormData(state, action: PayloadAction<TInit['formData']>) {
      state.formData = action.payload
    },
    reset: () => init,
  },
})

// actions
export const { reset, setFormData } = createCampaign.actions
// selectors

export const selectCreateCampaign: TSelector<TInit> = (state) => state.createCampaign

export const selectCreateCampaignFormData: TSelector<TInit['formData']> = createSelector(
  selectCreateCampaign,
  (state) => state.formData,
)

export default createCampaign.reducer
