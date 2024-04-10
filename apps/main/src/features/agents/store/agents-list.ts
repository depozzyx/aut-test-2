import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TAgent, agentsMock } from '../mocks/agentsMock'

export type TInit = {
  agentsList: TAgent[]
  selectedId: null | number
  meta: unknown
  pagination: TPagination
}

const init: TInit = {
  selectedId: null,
  agentsList: agentsMock,
  meta: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
}

const agents = createSlice({
  name: 'agents',
  initialState: init,
  reducers: {
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload
    },
    setAgentsList(state, action: PayloadAction<TAgent[]>) {
      state.agentsList = action.payload
    },
    deleteAgent(state, action: PayloadAction<TInit['selectedId']>) {
      state.agentsList = state.agentsList.filter(({ id }) => id !== action.payload)
      state.selectedId = null
    },
    reset: () => init,
  },
})

// actions
export const { setPagination, setSelectedId, deleteAgent, reset } = agents.actions
// selectors

export const selectAgents: TSelector<TInit> = (state) => state.agents

export const selectAgentsPagination = createSelector(
  selectAgents,
  ({ pagination }) => pagination,
)

export const selectAgentsList = createSelector(
  selectAgents,
  ({ agentsList }) => agentsList,
)

export const selectSelectedAgent = createSelector(
  selectAgents,
  ({ selectedId, agentsList }) => agentsList.find(({ id }) => id === selectedId),
)

export default agents.reducer
