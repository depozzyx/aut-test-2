import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { subDays } from 'date-fns'

export type TInit = {
  isLoading: boolean
  agentNameFilter?: number
  filterDate: {
    fromDate: string | Date
    toDate: string | Date
  }
}

const init: TInit = {
  isLoading: false,
  agentNameFilter: undefined,
  filterDate: {
    fromDate: subDays(new Date(), 8).toISOString(),
    toDate: new Date().toISOString(),
  },
}

const agentAnalytics = createSlice({
  name: 'agentAnalytics',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setAgentNameFilter(state, action: PayloadAction<TInit['agentNameFilter']>) {
      state.agentNameFilter = action.payload
    },
    setDateFilter(state, action: PayloadAction<TInit['filterDate']>) {
      state.filterDate = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setAgentNameFilter, setDateFilter, reset } =
  agentAnalytics.actions

export const selectCreateAgents: TSelector<TInit> = (state) => state.agentAnalytics

export const selectIsLoading = createSelector(
  selectCreateAgents,
  (state) => state.isLoading,
)

export const selectAgentNameFilter = createSelector(
  selectCreateAgents,
  (state) => state.agentNameFilter,
)

export const selectDateFilter = createSelector(
  selectCreateAgents,
  (state) => state.filterDate,
)

export default agentAnalytics.reducer
