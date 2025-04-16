import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkDispatch,
  Action,
} from '@reduxjs/toolkit'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TSelector, TAsyncAction, TRootState } from '@/store'
import {
  TActiveCampaignsReq,
  // TAgentAssignedCampaignsReq,
  TCampaignOrderBy,
} from '@/api-rest/campaigns/types'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import {
  TActiveCampaign,
  TAgentAssignedCampaign,
  TCampaign,
  TCampaignStatus,
  TCampaignTableType,
} from '../types'
import { CAMPAIGN_STATUSES, CAMPAIGN_TABLE_TYPES } from '../constants'

export type TInit = {
  isLoading: boolean
  selectedId: null | number | string
  activeCampaigns: TActiveCampaign[] | []
  agentAssignedCampaigns: TAgentAssignedCampaign[] | [] // new state for agent assigned active campaigns
  campaignList: TCampaign[] | []
  pagination: TPagination
  searchTerm?: string
  filterCampaignIds: number[]
  filterDate: {
    from?: string
    to?: string
  }
  filterStatus?: TCampaignStatus
  orderBy?: TCampaignOrderBy
  order?: TOrder
  isCampaignSelected: boolean // New state for campaign selection
}

const init: TInit = {
  isLoading: false,
  selectedId: null,
  activeCampaigns: [],
  agentAssignedCampaigns: [],
  campaignList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  searchTerm: '',
  filterCampaignIds: [],
  filterDate: {
    from: undefined,
    to: undefined,
  },
  filterStatus: undefined,
  orderBy: undefined,
  order: undefined,
  isCampaignSelected: false, // Initialize as false
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
      // todo
      state.activeCampaigns = action.payload
    },
    setAgentAssignedCampaigns(
      state,
      action: PayloadAction<TInit['agentAssignedCampaigns']>,
    ) {
      state.agentAssignedCampaigns = action.payload
    },
    setSearchTerm(state, action: PayloadAction<TInit['searchTerm']>) {
      state.searchTerm = action.payload
    },
    setFilterCampaignIds(state, action: PayloadAction<TInit['filterCampaignIds']>) {
      state.filterCampaignIds = action.payload
    },
    setFilterDate(state, action: PayloadAction<TInit['filterDate']>) {
      state.filterDate = action.payload
    },
    setFilterStatus(state, action: PayloadAction<TInit['filterStatus']>) {
      state.filterStatus = action.payload
    },
    setOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
      // ASC => DESC => clear
      if (action.payload === state.orderBy) {
        if (state.order === ORDER.ASC) {
          state.order = ORDER.DESC
        } else if (state.order === ORDER.DESC) {
          state.orderBy = undefined
          state.order = undefined
        }
      } else {
        state.orderBy = action.payload
        state.order = ORDER.ASC
      }
    },
    setOrder(state, action: PayloadAction<TInit['order']>) {
      state.order = action.payload
    },
    setIsCampaignSelected(state, action: PayloadAction<TInit['isCampaignSelected']>) {
      state.isCampaignSelected = action.payload
    },
    resetFilters(state) {
      state.searchTerm = ''
      state.filterCampaignIds = []
      state.filterStatus = undefined
      state.filterDate = {
        from: undefined,
        to: undefined,
      }
      state.pagination = init.pagination
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setSelectedId,
  setActiveCampaigns,
  setAgentAssignedCampaigns,
  setCampaignList,
  setSearchTerm,
  setFilterCampaignIds,
  setFilterDate,
  setFilterStatus,
  setOrderBy,
  setIsCampaignSelected, // New action
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

export const selectAgentAssignedCampaigns = createSelector(
  selectCampaigns,
  ({ agentAssignedCampaigns }) => agentAssignedCampaigns,
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

export const selectActiveCampaignsForView = createSelector(
  [selectActiveCampaigns],
  (activeCampaigns) => activeCampaigns,
)

export const selectCampaignsListForView = createSelector(
  [selectCampaignsList],
  (campaignList) => campaignList,
)

export const selectSearchTerm = createSelector(
  selectCampaigns,
  ({ searchTerm }) => searchTerm,
)

export const selectFilterCampaignIds = createSelector(
  selectCampaigns,
  ({ filterCampaignIds }) => filterCampaignIds,
)

export const selectFilterStatus = createSelector(
  selectCampaigns,
  ({ filterStatus }) => filterStatus,
)

export const selectOrderBy = createSelector(selectCampaigns, ({ orderBy }) => orderBy)
export const selectOrder = createSelector(selectCampaigns, ({ order }) => order)

export const selectSelectedCampaignId = createSelector(
  selectCampaigns,
  ({ selectedId }) => selectedId,
)

export const selectIsCampaignSelected = createSelector(
  selectCampaigns,
  ({ isCampaignSelected }) => isCampaignSelected,
)

type TCampaignByIdReturn = (state: TRootState) => TCampaign | undefined

export const selectCampaignById = (campaignId: number): TCampaignByIdReturn =>
  createSelector(selectCampaignsList, (campaignList) =>
    campaignList.find((campaign) => campaign.id === campaignId),
  )

export default campaigns.reducer

export const asyncGetActiveCampaigns =
  (params: TActiveCampaignsReq): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const { filterCampaignIds } = getState().campaigns
      const { data } = await apiCampaigns.getActiveCampaigns({
        status: CAMPAIGN_STATUSES.ACTIVE,
        ids: filterCampaignIds,
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

export const asyncGetAgentAssignedCampaigns = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(setIsLoading(true))
    const { data } = await apiCampaigns.getAgentAssignedActiveCampaigns()
    dispatch(setAgentAssignedCampaigns(data.data))
    // dispatch(setPagination(data.pagination))
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
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const { filterCampaignIds } = getState().campaigns
      const { data } = await apiCampaigns.getCampaignList({
        ids: filterCampaignIds,
        ...params,
      })
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
      const { selectedId, campaignList, activeCampaigns, pagination, searchTerm } =
        getState().campaigns

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
        // order: ORDER.DESC,
        search: searchTerm,
      }
      getCurrentCampaigns({ type, dispatch, params: params as TActiveCampaignsReq })
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
      dispatch(modalsActions.resetModalsState())
    }
  }

// export const asyncUpdateCampaignStatus =
//   (campaignId: number, currentStatus: TCampaignStatus): TAsyncAction =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setIsLoading(true))
//       const { campaignList, pagination } = getState().campaigns
//       const { name } = campaignList.find(({ id }) => id === campaignId) as TCampaign
//
//       if (currentStatus === CAMPAIGN_STATUSES.ACTIVE) {
//         await apiCampaigns.stopCampaign({ id: campaignId.toString() })
//         dispatch(
//           notificationActions.setNotification({
//             key: 'notifications:campaign.paused',
//             status: 'success',
//             values: { campaignName: name },
//           }),
//         )
//       } else {
//         await apiCampaigns.startCampaign({
//           id: campaignId.toString(),
//         })
//         dispatch(
//           notificationActions.setNotification({
//             key: 'notifications:campaign.active',
//             status: 'success',
//             values: { campaignName: name },
//           }),
//         )
//       }
//
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         orderBy: SORT_BY.CREATED_AT,
//         orderBy: ORDER.DESC,
//       }
//
//       getCurrentCampaigns({
//         type: CAMPAIGN_TABLE_TYPES.LIST,
//         dispatch,
//         params: params as TActiveCampaignsReq,
//       })
//     } catch (e) {
//       handleRestError({ e, dispatch })
//     } finally {
//       dispatch(setIsLoading(false))
//     }
//   }

export const asyncStartOrStopCampaign =
  (campaignId: number, currentStatus: TCampaignStatus): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const { campaignList, pagination } = getState().campaigns
      const { name } = campaignList.find(({ id }) => id === campaignId) as TCampaign

      if (currentStatus === CAMPAIGN_STATUSES.ACTIVE) {
        await apiCampaigns.stop(campaignId)
        dispatch(
          notificationActions.setNotification({
            key: 'notifications:campaign.paused',
            status: 'success',
            values: { campaignName: name },
          }),
        )
      } else {
        await apiCampaigns.start(campaignId)
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
        // orderBy: ORDER.DESC,
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
