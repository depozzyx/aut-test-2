import {
  createSlice,
  PayloadAction,
  createSelector,
  ThunkDispatch,
  Action,
} from '@reduxjs/toolkit'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TSelector, TAsyncAction, TRootState } from '@/store'
import { TActiveCampaignsReq } from '@/api-rest/campaigns/types'
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

export type TInit = {
  isLoading: boolean
  selectedId: null | number | string
  activeCampaigns: TActiveCampaign[] | []
  campaignList: TCampaign[] | []
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  isLoading: false,
  selectedId: null,
  activeCampaigns: [],
  campaignList: [],
  meta: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
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
    reset: () => init,
  },
})

// actions
export const {
  setIsLoading,
  setPagination,
  setSelectedId,
  setActiveCampaigns,
  setCampaignList,
  reset,
} = campaigns.actions

// selectors
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

export const selectSelectedCampaignFromList = createSelector(
  selectCampaigns,
  ({ selectedId, campaignList }) => campaignList.find(({ id }) => id === selectedId),
)

export const selectSelectedCampaignFromActive = createSelector(
  selectCampaigns,
  ({ selectedId, activeCampaigns }) =>
    activeCampaigns.find(({ id }) => id === selectedId),
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

export const selectCampaignsNames = createSelector(
  selectActiveCampaigns,
  (activeCampaigns) =>
    activeCampaigns.map(({ name, id }) => ({
      label: name,
      value: id.toString(),
    })),
)

export default campaigns.reducer

export const asyncGetActiveCampaigns =
  (params: TActiveCampaignsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiCampaigns.getActiveCampaigns(params)

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
      const { selectedId, campaignList, activeCampaigns, pagination } =
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
        orderBy: 'ASC',
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
