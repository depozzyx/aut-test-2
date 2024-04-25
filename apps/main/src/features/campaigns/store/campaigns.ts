import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TActiveCampaign, activeCampaignsMock } from '../mocks/activeCampaignsMock'
import { TCampaign, campaignsMock } from '../mocks/campaignsMock'

export type TInit = {
  selectedId: null | number | string
  activeCampaigns: TActiveCampaign[]
  campaignList: TCampaign[]
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  selectedId: null,
  activeCampaigns: activeCampaignsMock,
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
    setActiveCampaigns(state, action: PayloadAction<TActiveCampaign[]>) {
      state.activeCampaigns = action.payload
    },
    deleteActiveCampaigns(state, action: PayloadAction<TInit['selectedId']>) {
      state.activeCampaigns = state.activeCampaigns.filter(
        ({ id }) => id !== action.payload,
      )
      state.selectedId = null
    },
    setCampaignStatus(state, action: PayloadAction<TInit['selectedId']>) {
      state.campaignList = state.campaignList.map((campaign) => {
        if (campaign.id === action.payload) {
          if (campaign.status === 'active') {
            return { ...campaign, status: 'pause' } // Change "paused" to "pause"
          }
          return { ...campaign, status: 'active' }
        }
        return campaign
      })
    },
    reset: () => init,
  },
})

// actions
export const {
  setPagination,
  setSelectedId,
  deleteCampaign,
  setCampaignStatus,
  deleteActiveCampaigns,
  reset,
} = campaigns.actions
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

export const selectActiveCampaigns = createSelector(
  selectCampaigns,
  ({ activeCampaigns }) => activeCampaigns,
)

export const selectCampaignsNames = createSelector(
  selectActiveCampaigns,
  (activeCampaigns) =>
    activeCampaigns.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    })),
)

export default campaigns.reducer
