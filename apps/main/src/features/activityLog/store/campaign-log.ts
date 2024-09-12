import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { TCampaignLogData, TCampaignLogsReq } from '@/api-rest/campaign-log/types'
import { TPagination } from '@/types/entities/pagination'
import { TGroupedLogs } from '@/features/activityLog/utils/groupLogsByDate'

export type TInit = {
  params: Omit<TCampaignLogsReq, 'page' | 'limit'>
  pagination: TPagination
  logsData: [] | TGroupedLogs<TCampaignLogData>[]
  currentLogDetails: TCampaignLogData['details']
}

const init: TInit = {
  params: {},
  pagination: {
    page: 1,
    limit: 25,
    total: 1,
  },
  logsData: [],
  currentLogDetails: null,
}

const campaignLog = createSlice({
  name: 'campaignLog',
  initialState: init,
  reducers: {
    updateParams: (state, action: PayloadAction<Partial<TCampaignLogsReq>>) => {
      state.params = { ...state.params, ...action.payload }
    },
    deleteParams(state, action: PayloadAction<keyof TInit['params']>) {
      const copyParams = { ...state.params }
      delete copyParams[action.payload]
      state.params = copyParams
    },
    resetParams(state) {
      state.params = init.params
    },
    setLogsData: (state, action: PayloadAction<TInit['logsData']>) => {
      state.logsData = action.payload
    },
    setPagination: (state, action: PayloadAction<TInit['pagination']>) => {
      state.pagination = action.payload
    },
    setCurrentLogDetails: (state, action: PayloadAction<TInit['currentLogDetails']>) => {
      state.currentLogDetails = action.payload
    },
    resetCampaignLog: () => init,
  },
})

export const {
  updateParams,
  deleteParams,
  resetParams,
  setLogsData,
  setPagination,
  resetCampaignLog,
  setCurrentLogDetails,
} = campaignLog.actions

export const selectCampaignLog: TSelector<TInit> = (state) => state.campaignLog

export const selectParams = createSelector(selectCampaignLog, ({ params }) => params)

export const selectLogPagination = createSelector(
  selectCampaignLog,
  ({ pagination }) => pagination,
)

export const selectLogsData = createSelector(
  selectCampaignLog,
  ({ logsData }) => logsData,
)

export const selectCurrentLogDetails = createSelector(
  selectCampaignLog,
  ({ currentLogDetails }) => currentLogDetails,
)

export default campaignLog.reducer
