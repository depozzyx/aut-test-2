import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { TAgentWorkStatus } from '@/features/agents/types'
import { TAgentStatus, TChangeWorkStatusReq } from '@/api-rest/agents/types'

export type TInit = {
  status: TAgentWorkStatus | null
  loading: boolean
  pbxStatus: TAgentStatus['data']
  checkCampaignId: boolean
}

const init: TInit = {
  status: null,
  loading: false,
  pbxStatus: 'offline',
  checkCampaignId: false,
}

const agentStatus = createSlice({
  name: 'agentStatus',
  initialState: init,
  reducers: {
    setStatus(state, action: PayloadAction<TInit['status']>) {
      state.status = action.payload
    },
    setPBXStatus(state, action: PayloadAction<TInit['pbxStatus']>) {
      state.pbxStatus = action.payload
    },
    setLoading(state, action: PayloadAction<TInit['loading']>) {
      state.loading = action.payload
    },
    setCheckCampaignId(state, action: PayloadAction<TInit['checkCampaignId']>) {
      state.checkCampaignId = action.payload
    },
    reset: () => init,
  },
})

// actions
const { setStatus, setLoading, setPBXStatus, setCheckCampaignId, reset } =
  agentStatus.actions

const setStatusAsync =
  (workStatus: TAgentWorkStatus, onSuccess?: () => void): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      const campaignId = getState().agents.selectedCampaignId
      const payload: TChangeWorkStatusReq = { workStatus }
      payload.campaignId = campaignId || '-1'
      const { data } = await apiAgents.changeWorkStatus(payload)
      dispatch(setStatus(data.data.workStatus))
      onSuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setLoading(false))
    }
  }

export const agentActions = {
  setStatus,
  setStatusAsync,
  reset,
  setPBXStatus,
  setCheckCampaignId,
}
// selectors
export const agentStatusSelector: TSelector<TInit> = (state) => state.agentStatus

export default agentStatus.reducer
