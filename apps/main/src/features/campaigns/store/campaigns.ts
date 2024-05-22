import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkDispatch,
  Action,
} from '@reduxjs/toolkit'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TSelector, TAsyncAction, TRootState } from '@/store'
import { TActiveCampaignsReq, TSortBy } from '@/api-rest/campaigns/types'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import {
  TActiveCampaign,
  TCampaign,
  TCampaignStatus,
  TCampaignTableType,
} from '@/features/campaigns/types'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'
import { CAMPAIGN_STATUSES, CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import { TOrderBy } from '@/types/entities/orderBy'

export type TInit = {
  isLoading: boolean
  selectedId: null | number | string
  activeCampaigns: TActiveCampaign[] | []
  campaignList: TCampaign[] | []
  meta: unknown
  pagination: TPagination
  searchTerm?: string
  filterCampaignName?: string | number
  filterDate: {
    from?: string
    to?: string
  }
  filterStatus?: TCampaignStatus
  sort: { sortBy?: TSortBy; orderBy: TOrderBy }
}

const init: TInit = {
  isLoading: false,
  selectedId: null,
  activeCampaigns: [],
  campaignList: [],
  meta: {},
  pagination: {
    page: 1,
    limit: 8,
    total: 1,
  },
  searchTerm: '',
  filterCampaignName: '',
  filterDate: {
    from: undefined,
    to: undefined,
  },
  filterStatus: undefined,
  sort: { sortBy: undefined, orderBy: 'ASC' },
}

const campaigns = createSlice({
  name: 'campaigns',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setCampaignList(state, action: PayloadAction<TInit['campaignList']>) {
      state.campaignList = action.payload
    },
    setActiveCampaigns(state, action: PayloadAction<TInit['activeCampaigns']>) {
      state.activeCampaigns = action.payload
    },
    setSearchTerm(state, action: PayloadAction<TInit['searchTerm']>) {
      state.searchTerm = action.payload
    },
    setFilterCampaignName(state, action: PayloadAction<TInit['filterCampaignName']>) {
      state.filterCampaignName = action.payload
    },
    setFilterDate(state, action: PayloadAction<TInit['filterDate']>) {
      state.filterDate = action.payload
    },
    setFilterStatus(state, action: PayloadAction<TInit['filterStatus']>) {
      state.filterStatus = action.payload
    },
    setSort(state, action: PayloadAction<TInit['sort']>) {
      state.sort = action.payload
    },
    resetFilters(state) {
      state.searchTerm = ''
      state.filterCampaignName = ''
      state.filterStatus = undefined
      state.filterDate = {
        from: undefined,
        to: undefined,
      }
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setSelectedId,
  setActiveCampaigns,
  setCampaignList,
  setSearchTerm,
  setFilterCampaignName,
  setFilterDate,
  setFilterStatus,
  setSort,
  resetFilters,
  reset,
} = campaigns.actions

export const selectCampaigns: TSelector<TInit> = (state) => state.campaigns

export const selectIsLoading = createSelector(
  selectCampaigns,
  ({ isLoading }) => isLoading,
)

export const selectCampaignsPagination = createSelector(
  selectCampaigns,
  ({ pagination }) => pagination,
)

export const selectCampaignsList = createSelector(
  selectCampaigns,
  ({ campaignList }) => campaignList,
)

export const selectActiveCampaigns = createSelector(
  selectCampaigns,
  ({ activeCampaigns }) => activeCampaigns,
)

export const selectFilterDate = createSelector(
  selectCampaigns,
  ({ filterDate }) => filterDate,
)

export const selectCampaignForDelete = (
  type: TCampaignTableType,
): TSelector<TCampaign | TActiveCampaign> =>
  createSelector(selectCampaigns, ({ selectedId, activeCampaigns, campaignList }) => {
    let selectedCampaign = null

    if (type === CAMPAIGN_TABLE_TYPES.ACTIVE) {
      selectedCampaign = activeCampaigns.find(
        ({ id }) => id === selectedId,
      ) as TActiveCampaign
    } else {
      selectedCampaign = campaignList.find(({ id }) => id === selectedId) as TCampaign
    }

    return selectedCampaign
  })

// ToDo: change to correct format for user view
export const selectActiveCampaignsForView = createSelector(
  [selectActiveCampaigns],
  (activeCampaigns) => activeCampaigns,
)

// ToDo: change to correct format for user view
export const selectCampaignsListForView = createSelector(
  [selectCampaignsList],
  (campaignList) => campaignList,
)

export const selectSearchTerm = createSelector(
  selectCampaigns,
  ({ searchTerm }) => searchTerm,
)

export const selectFilterCampaignName = createSelector(
  selectCampaigns,
  ({ filterCampaignName }) => filterCampaignName,
)

export const selectFilterStatus = createSelector(
  selectCampaigns,
  ({ filterStatus }) => filterStatus,
)

export const selectSort = createSelector(selectCampaigns, ({ sort }) => sort)

export const selectSelectedCampaignId = createSelector(
  selectCampaigns,
  ({ selectedId }) => selectedId,
)

export default campaigns.reducer

export const asyncGetActiveCampaigns =
  (params: TActiveCampaignsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiCampaigns.getActiveCampaigns({
        status: CAMPAIGN_STATUSES.ACTIVE,
        ...params,
      })

      dispatch(setActiveCampaigns(data.data))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({
        e,
        dispatch,
      })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncGetCampaignsList =
  (params: TActiveCampaignsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiCampaigns.getCampaignList(params)

      dispatch(setCampaignList(data.data))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({
        e,
        dispatch,
      })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

const getCurrentCampaigns = ({
  type,
  dispatch,
  params,
}: {
  type: TCampaignTableType
  dispatch: ThunkDispatch<TRootState, unknown, Action>
  params: TActiveCampaignsReq
}) => {
  const getCampaigns =
    type === CAMPAIGN_TABLE_TYPES.ACTIVE ? asyncGetActiveCampaigns : asyncGetCampaignsList
  dispatch(getCampaigns(params))
}

export const asyncRemoveCampaign =
  (type: TCampaignTableType): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const {
        selectedId,
        campaignList,
        activeCampaigns,
        pagination,
        searchTerm,
        filterCampaignName,
      } = getState().campaigns

      let campaignName = ''

      if (type === CAMPAIGN_TABLE_TYPES.ACTIVE) {
        campaignName = activeCampaigns.find((campaign) => campaign.id === selectedId)
          ?.name as string
      } else {
        campaignName = campaignList.find((campaign) => campaign.id === selectedId)
          ?.name as string
      }

      await apiCampaigns.deleteCampaign(selectedId as number)

      dispatch(modalsActions.resetModalsState())

      dispatch(
        notificationActions.setNotification({
          key: 'notifications:campaign.success-delete',
          status: 'success',
          values: { campaignName },
        }),
      )

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        orderBy: 'ASC',
        search: searchTerm,
        name: filterCampaignName,
      }
      getCurrentCampaigns({ type, dispatch, params: params as TActiveCampaignsReq })
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
      dispatch(modalsActions.resetModalsState())
    }
  }

export const asyncUpdateCampaignStatus =
  (campaignId: number, currentStatus: TCampaignStatus): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const { campaignList, pagination } = getState().campaigns
      const { name } = campaignList.find(({ id }) => id === campaignId) as TCampaign

      if (currentStatus === CAMPAIGN_STATUSES.ACTIVE) {
        await apiCampaigns.stopCampaign({ id: campaignId.toString() })
        dispatch(
          notificationActions.setNotification({
            key: 'notifications:campaign.paused',
            status: 'success',
            values: { campaignName: name },
          }),
        )
      } else {
        await apiCampaigns.startCampaign({ id: campaignId.toString() })
        dispatch(
          notificationActions.setNotification({
            key: 'notifications:campaign.active',
            status: 'success',
            values: { campaignName: name },
          }),
        )
      }

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        orderBy: 'ASC',
      }

      getCurrentCampaigns({
        type: CAMPAIGN_TABLE_TYPES.LIST,
        dispatch,
        params: params as TActiveCampaignsReq,
      })
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
