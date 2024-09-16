import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { TAgentWorkStatus } from '@/features/agents/types'
import { TAgentStatus } from '@/api-rest/agents/types'

export type TInit = {
  status: TAgentWorkStatus | null
  loading: boolean
  pbxStatus: TAgentStatus['data']
}

const init: TInit = {
  status: null,
  loading: false,
  pbxStatus: 'offline',
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
    reset: () => init,
  },
})

// actions
const { setStatus, setLoading, setPBXStatus, reset } = agentStatus.actions

const setStatusAsync =
  (workStatus: TAgentWorkStatus, onSuccess?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const { data } = await apiAgents.changeWorkStatus({ workStatus })
      dispatch(setStatus(data.data.workStatus))
      onSuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setLoading(false))
    }
  }

export const agentActions = { setStatus, setStatusAsync, reset, setPBXStatus }
// selectors
export const agentStatusSelector: TSelector<TInit> = (state) => state.agentStatus

export default agentStatus.reducer
