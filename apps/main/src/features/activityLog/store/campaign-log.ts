import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TCampaignLogData, TCampaignLogsReq } from '@/api-rest/campaign-log/types'
import { handleRestError } from '@/features/common/error'
import { campaignLogsApi } from '@/api-rest/campaign-log'
import { TPagination } from '@/types/entities/pagination'

export type TInit = {
  isCLLoading: boolean
  params: Omit<TCampaignLogsReq, 'page' | 'limit'>
  pagination: TPagination
  logsData: [] | TCampaignLogData[]
}

const init: TInit = {
  isCLLoading: false,
  params: {
    orderBy: 'ASC',
  },
  pagination: {
    page: 1,
    limit: 25,
    total: 1,
  },
  logsData: [],
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
    setIsCLLoading: (state, action: PayloadAction<TInit['isCLLoading']>) => {
      state.isCLLoading = action.payload
    },
    setLogsData: (state, action: PayloadAction<TInit['logsData']>) => {
      state.logsData = action.payload
    },
    setPagination: (state, action: PayloadAction<TInit['pagination']>) => {
      state.pagination = action.payload
    },
    resetCampaignLog: () => init,
  },
})

export const {
  resetCampaignLog,
  updateParams,
  setIsCLLoading,
  setLogsData,
  setPagination,
  deleteParams,
  resetParams,
} = campaignLog.actions

export const selectCampaignLog: TSelector<TInit> = (state) => state.campaignLog

export const selectParams = createSelector(selectCampaignLog, ({ params }) => params)

export const selectIsCLLoading = createSelector(
  selectCampaignLog,
  ({ isCLLoading }) => isCLLoading,
)

export const selectLogsData = createSelector(
  selectCampaignLog,
  ({ logsData }) => logsData,
)

export const selectLogPagination = createSelector(
  selectCampaignLog,
  ({ pagination }) => pagination,
)

export default campaignLog.reducer

export const asyncGetCampaignLog =
  (params: TCampaignLogsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsCLLoading(true))
      const { data } = await campaignLogsApi.getCampaignLogs(params)

      dispatch(setLogsData(data.data))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({
        e,
        dispatch,
      })
    } finally {
      dispatch(setIsCLLoading(false))
    }
  }
