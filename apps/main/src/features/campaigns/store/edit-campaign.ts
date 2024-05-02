import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TCampaignTableType } from '@/features/campaigns/types'
import { apiCampaigns } from '@/api-rest/campaigns'
import { CAMPAIGN_TABLE_TYPES } from '@/features/campaigns/constants'
import {
  asyncGetActiveCampaigns,
  asyncGetCampaignsList,
} from '@/features/campaigns/store/campaigns'
import { handleRestError } from '@/features/common/error'
import { modalsActions } from '@/features/common/modals/store'
import { setIsLoading } from '@/features/campaigns/store/create-campaign'
import { TEditCampaignReq } from '@/api-rest/campaigns/types'
import { notificationActions } from '@/features/common/notifications/store/'

export type TInit = {
  formData: Record<string, unknown>
}

const init: TInit = {
  formData: {},
}

const editCampaign = createSlice({
  name: 'editCampaign',
  initialState: init,
  reducers: {
    setFormData(state, action: PayloadAction<Record<string, unknown>>) {
      state.formData = action.payload
    },
    reset: () => init,
  },
})

// actions
export const { reset, setFormData } = editCampaign.actions
// selectors

export const selectEditCampaign: TSelector<TInit> = (state) => state.editCampaign

export const selectEditCampaignFormData: TSelector<Record<string, unknown>> =
  createSelector(selectEditCampaign, (state) => state.formData)

export default editCampaign.reducer

export const asyncEditCampaign =
  (formData: Omit<TEditCampaignReq, 'id'>, type: TCampaignTableType): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))

      if (formData) {
        const { selectedId } = getState().campaigns

        const dataForRequest = {
          id: selectedId as number,
          ...formData,
          leadListIds: formData.leadListIds || [],
          assignedAgentIds: [],
          reserveAgentIds: [],
        }

        await apiCampaigns.editCampaign(dataForRequest)
      }

      const { page, limit } = getState().campaigns.pagination
      if (type === CAMPAIGN_TABLE_TYPES.ACTIVE) {
        dispatch(asyncGetActiveCampaigns({ page, limit, orderBy: 'ASC' }))
      } else {
        dispatch(asyncGetCampaignsList({ page, limit, orderBy: 'ASC' }))
      }

      dispatch(
        notificationActions.setNotification({
          key: 'notifications:campaign.changes-saved',
          status: 'success',
          values: { campaignName: formData?.name },
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
      dispatch(modalsActions.resetModalsState())
    }
  }
