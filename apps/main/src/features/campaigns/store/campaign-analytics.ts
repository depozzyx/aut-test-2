import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subDays } from 'date-fns'
import { TSelector } from '@/store'
import { TCampaignAnalytics } from '@/api-rest/campaign-analytics/types'

export type TInit = {
  isLoading: boolean
  filterDate: {
    fromDate: string | Date
    toDate: string | Date
  }
  analyticsData: TCampaignAnalytics[]
}

const init: TInit = {
  isLoading: false,
  filterDate: {
    fromDate: subDays(new Date(), 8).toISOString(),
    toDate: new Date().toISOString(),
  },
  analyticsData: [],
}

const campaignAnalytics = createSlice({
  name: 'campaignAnalytics',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
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

export const { setIsLoading, setDateFilter, setAnalyticsData, reset } =
  campaignAnalytics.actions

export const selectCampaignAnalytics: TSelector<TInit> = (state) =>
  state.campaignAnalytics

export const selectIsLoading = createSelector(
  selectCampaignAnalytics,
  (state) => state.isLoading,
)

export const selectDateFilter = createSelector(
  selectCampaignAnalytics,
  (state) => state.filterDate,
)

export const selectAnalyticsData = createSelector(
  selectCampaignAnalytics,
  (state) => state.analyticsData,
)

export const selectConversionRateData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    conversionRate: analytics.conversionRate,
    date: analytics.dateStatistic,
  })),
)

export const selectAnswerRateData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    callAnswerRate: analytics.callAnswerRate,
    date: analytics.dateStatistic,
  })),
)

export const selectAverageCallDurationData = createSelector(selectAnalyticsData, (data) =>
  data.map(({ analytics }) => ({
    averageCallDuration: analytics.averageCallDuration,
    date: analytics.dateStatistic,
  })),
)

export default campaignAnalytics.reducer
