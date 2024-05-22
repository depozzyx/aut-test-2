import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { TAgentWorkStatus } from '@/features/agents/types'

export type TInit = {
  status: TAgentWorkStatus | null
}

const init: TInit = {
  status: null,
}

const agentStatus = createSlice({
  name: 'agentStatus',
  initialState: init,
  reducers: {
    setStatus(state, action: PayloadAction<TInit['status']>) {
      state.status = action.payload
    },
    reset: () => init,
  },
})

// actions
const { setStatus, reset } = agentStatus.actions

const setStatusAsync =
  (workStatus: TAgentWorkStatus): TAsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await apiAgents.changeWorkStatus({ workStatus })
      setStatus(data.data.workStatus)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

export const agentActions = { setStatus, setStatusAsync, reset }
// selectors
export const agentStatusSelector: TSelector<TInit> = (state) => state.agentStatus

export default agentStatus.reducer
