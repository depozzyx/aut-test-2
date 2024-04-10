import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TCampaign, campaignsMock } from '../mocks/campaignsMock'

export type TInit = {
  campaignList: TCampaign[]
  selectedId: null | number
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  selectedId: null,
  campaignList: campaignsMock,
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
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload
    },
    setCampaignList(state, action: PayloadAction<TCampaign[]>) {
      state.campaignList = action.payload
    },
    deleteCampaign(state, action: PayloadAction<TInit['selectedId']>) {
      state.campaignList = state.campaignList.filter(({ id }) => id !== action.payload)
      state.selectedId = null
    },
    reset: () => init,
  },
})

// actions
export const { setPagination, setSelectedId, deleteCampaign, reset } = campaigns.actions
// selectors

export const selectCampaigns: TSelector<TInit> = (state) => state.campaigns

export const selectCampaignsPagination = createSelector(
  selectCampaigns,
  ({ pagination }) => pagination,
)

export const selectCampaignsList = createSelector(
  selectCampaigns,
  ({ campaignList }) => campaignList,
)

export const selectSelectedCampaign = createSelector(
  selectCampaigns,
  ({ selectedId, campaignList }) => campaignList.find(({ id }) => id === selectedId),
)

export default campaigns.reducer
