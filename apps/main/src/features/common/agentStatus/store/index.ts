import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { TAgentWorkStatus } from '@/features/agents/types'
import { AgentStatus, TAgentStatus } from '@/api-rest/agents/types'

export type TInit = {
  status: TAgentWorkStatus | null
  loading: boolean
  pbxStatus: TAgentStatus['data']
  checkCampaignId: boolean
}

const init: TInit = {
  status: null,
  loading: false,
  pbxStatus: {
    status: 'offline',
    exten: '',
    reason: '',
  },
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

const checkStoredAndPbxAgentStatus = async (
  agentStatus: AgentStatus,
  changeStoreAgentStatus: (payload: TInit['pbxStatus']) => void,
): Promise<boolean> => {
  const { data: response } = await apiAgents.getAgentStatus()
  const pbxAgentStatus = response?.data?.status
  const isDifferent = agentStatus !== pbxAgentStatus
  if (isDifferent) {
    console.warn(
      `Agent status in PBX is ${pbxAgentStatus} but in Redux is '${agentStatus}'`,
    )
    changeStoreAgentStatus(response.data)
  }
  return isDifferent
}

const setStatusAsync =
  (workStatus: TAgentWorkStatus, reason?: string, onSuccess?: () => void): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))

      const agentStatus = getState().agentStatus.pbxStatus.status
      const campaignId = getState().agents.selectedCampaignId || '-1'

      const isDifferent = await checkStoredAndPbxAgentStatus(
        agentStatus,
        (payload: TInit['pbxStatus']) => dispatch(setPBXStatus(payload)),
      )
      if (isDifferent) {
        return
      }

      const { data } = await apiAgents.changeWorkStatus({
        workStatus,
        reason,
        campaignId,
      })
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
