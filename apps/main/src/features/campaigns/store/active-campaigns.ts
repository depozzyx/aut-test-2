import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { activeCampaignsMock, TActiveCampaign } from '../mocks/activeCampaignsMock'

export type TInit = {
  campaigns: TActiveCampaign[]
  selectedId: null | number
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  campaigns: activeCampaignsMock,
  selectedId: null,
  meta: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
}

const activeCampaigns = createSlice({
  name: 'activeCampaigns',
  initialState: init,
  reducers: {
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload
    },
    setActiveCampaigns(state, action: PayloadAction<TActiveCampaign[]>) {
      state.campaigns = action.payload
    },
    deleteCampaign(state, action: PayloadAction<TInit['selectedId']>) {
      state.campaigns = state.campaigns.filter(({ id }) => id !== action.payload)
      state.selectedId = null
    },
    reset: () => init,
  },
})

// actions
export const { setPagination, setSelectedId, deleteCampaign, reset } =
  activeCampaigns.actions
// selectors

export const selectActiveCampaigns: TSelector<TInit> = (state) => state.activeCampaigns

export const selectCampaignsPagination = createSelector(
  selectActiveCampaigns,
  ({ pagination }) => pagination,
)

export const selectCampaigns = createSelector(
  selectActiveCampaigns,
  ({ campaigns }) => campaigns,
)

export const selectSelectedCampaign = createSelector(
  selectActiveCampaigns,
  ({ selectedId, campaigns }) => campaigns.find(({ id }) => id === selectedId),
)

export default activeCampaigns.reducer
