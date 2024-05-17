import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subDays } from 'date-fns'
import { TSelector } from '@/store'
import { TAgentAnalyticsData } from '@/api-rest/agent-analytics/types'

export type TInit = {
  isLoading: boolean
  agentNameFilter?: number
  filterDate: {
    fromDate: string | Date
    toDate: string | Date
  }
  analyticsData: TAgentAnalyticsData[]
}

const init: TInit = {
  isLoading: false,
  agentNameFilter: undefined,
  filterDate: {
    fromDate: subDays(new Date(), 8).toISOString(),
    toDate: new Date().toISOString(),
  },
  analyticsData: [],
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
    setAnalyticsData(state, action: PayloadAction<TInit['analyticsData']>) {
      state.analyticsData = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setAgentNameFilter,
  setDateFilter,
  setAnalyticsData,
  reset,
} = agentAnalytics.actions

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

export const selectAnalyticsData = createSelector(
  selectCreateAgents,
  (state) => state.analyticsData,
)

export const selectAvailailityOnlineData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    availability: analytics.availability,
    date: analytics.dateStatistic,
  })),
)

export const selectAverageCallDurationData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    averageCallDuration: analytics.averageCallDuration,
    date: analytics.dateStatistic,
  })),
)

export const selectCallMinutesData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    callMinutes: analytics.callMinutes,
    date: analytics.dateStatistic,
  })),
)

export const selectCallSuccessData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    successfulCalls: analytics.successfulCalls,
    undeterminedCalls: analytics.undeterminedCalls,
    unsuccessfulCalls: analytics.unsuccessfulCalls,
    date: analytics.dateStatistic,
  })),
)

export default agentAnalytics.reducer
