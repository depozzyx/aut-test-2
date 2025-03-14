import filter from 'lodash/filter'
import includes from 'lodash/includes'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { modalsActions } from '@/features/common/modals/store'
import { handleRestError } from '@/features/common/error'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TCreateCampaignReq } from '@/api-rest/campaigns/types'
import { selectLeadListCatalogAsOptions } from '@/features/leads/store/lead-list'
import { TCampaignTableType } from '@/features/campaigns/types'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import {
  asyncGetActiveCampaigns,
  asyncGetCampaignsList,
} from '@/features/campaigns/store/campaigns'
import { notificationActions } from '@/features/common/notifications/store'
import { selectAgentsOptions } from '@/features/agents/store/agents'

export type TInit = {
  isLoading: boolean
  formData: null | TCreateCampaignReq
}

const init: TInit = {
  isLoading: false,
  formData: null,
}

const createCampaign = createSlice({
  name: 'createCampaign',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setFormData(state, action: PayloadAction<TInit['formData']>) {
      state.formData = action.payload
    },
    reset: () => init,
  },
})

// actions
export const { reset, setFormData, setIsLoading } = createCampaign.actions

// selectors
export const selectCreateCampaign: TSelector<TInit> = (state) => state.createCampaign

export const selectCreateCampaignFormData: TSelector<TInit['formData']> = createSelector(
  selectCreateCampaign,
  (state) => state.formData,
)

export const selectFormDataForReview = createSelector(
  [selectCreateCampaignFormData, selectLeadListCatalogAsOptions, selectAgentsOptions],
  (formData, leadListCatalog, agentsOptions) => {
    if (!formData) return null

    const leadsLabels =
      uniq(
        map(
          filter(leadListCatalog, (leadList) =>
            includes(formData.leadListIds, leadList.value),
          ),
          'label',
        ),
      ) || []

    const agentsLabels =
      uniq(
        map(
          filter(agentsOptions, (assignedAgent) =>
            includes(formData.assignedAgentIds, assignedAgent.value),
          ),
          'label',
        ),
      ) || []

    return {
      ...formData,
      assignedAgentIds: agentsLabels,
      leadListIdsLabel: leadsLabels,
    }
  },
)

export default createCampaign.reducer

export const reviewFormData =
  (formData: TCreateCampaignReq): TAsyncAction =>
  async (dispatch) => {
    dispatch(setFormData(formData))
    dispatch(modalsActions.setModal({ modalName: 'REVIEW_CAMPAIGN', isOpen: true }))
  }

export const asyncCreateCampaign =
  (type: TCampaignTableType): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const { formData } = getState().createCampaign
      if (formData) {
        const dataForRequest = {
          ...formData,
          leadListIds: formData.leadListIds || [],
          assignedAgentIds: formData.assignedAgentIds || [],
          reserveAgentIds: formData.assignedAgentIds || [],
          filterLeadStatuses: formData.filterLeadStatuses || [],
          recycleRules: formData.recycleRules || [],
        }

        await apiCampaigns.createCampaign(dataForRequest)
      }

      const { page, limit } = getState().campaigns.pagination
      if (type === CAMPAIGN_TABLE_TYPES.ACTIVE) {
        dispatch(asyncGetActiveCampaigns({ page, limit, orderBy: 'DESC' }))
      } else {
        dispatch(asyncGetCampaignsList({ page, limit, orderBy: 'DESC' }))
      }

      dispatch(
        notificationActions.setNotification({
          key: 'notifications:campaign.create-success',
          status: 'success',
          values: { campaignName: formData?.name },
        }),
      )
      dispatch(reset())
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
      dispatch(modalsActions.resetModalsState())
    }
  }
