import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TActivityLogsReq } from '@/api-rest/activity-logs/types'
import { activityLogApi } from '@/api-rest/activity-logs'
import { groupLogsByDate } from '../utils/groupLogsByDate'
import { GroupedLogs } from '../types/activity-log'

export type TInit = {
  activityLogs: GroupedLogs[]
  pagination: TPagination
  filters: Omit<TActivityLogsReq, 'page' | 'limit'>
  isLoading: boolean
}

const init: TInit = {
  activityLogs: [],
  pagination: {
    page: 1,
    limit: 25,
    total: 1,
  },
  filters: {},
  isLoading: true,
}

const activityLog = createSlice({
  name: 'activity-log',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setFilters(state, action: PayloadAction<TInit['filters']>) {
      state.filters = action.payload
    },
    deleteFilter(state, action: PayloadAction<keyof TInit['filters']>) {
      const copyFilters = { ...state.filters }
      delete copyFilters[action.payload]
      state.filters = copyFilters
    },
    resetFilters(state) {
      state.filters = {}
    },
    setActivityLog(state, action: PayloadAction<TInit['activityLogs']>) {
      state.activityLogs = action.payload
    },
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    reset: () => init,
  },
})

// actions
export const {
  setPagination,
  setActivityLog,
  setIsLoading,
  setFilters,
  deleteFilter,
  resetFilters,
  reset,
} = activityLog.actions
// selectors

export const selectActivityLogs: TSelector<TInit> = (state) => state.activityLog

export default activityLog.reducer

export const getActivityLogsAsync =
  (params: TActivityLogsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { pagination, data },
      } = await activityLogApi.get(params)

      dispatch(setActivityLog(groupLogsByDate(data)))
      dispatch(setPagination(pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
