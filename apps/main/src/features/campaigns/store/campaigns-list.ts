import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'

export type TInit = {
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  meta: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
}

const campaigns = createSlice({
  name: 'campaigns',
  initialState: init,
  reducers: {
    setCampaigns(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload
    },

    reset: () => init,
  },
})

// actions
export const { setCampaigns, reset } = campaigns.actions
// selectors
export const selectCampaigns: TSelector<TInit> = (state) => state.campaigns

export const selectCampaignsPagination = createSelector(
  selectCampaigns,
  ({ pagination }) => pagination,
)

export default campaigns.reducer
