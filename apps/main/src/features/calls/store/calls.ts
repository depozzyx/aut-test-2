import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'
import { startOfMonth, endOfDay } from 'date-fns'

import { apiCalls } from '../../../api/rest/calls'
import { CallOrderBy, TCDRList } from '../../../api/rest/calls/types'

export type CDRListFilters = {
  leadListId?: number
  campaignId?: number
  status?: string
  agentGroupId?: number
  agentId?: number
  phone?: string
  country?: string
  disposition?: string
  date?: { from?: number; to?: number }
}

export type TInit = {
  CDRList: TCDRList[]
  pagination: TPagination
  isLoading: Record<string, boolean>
  orderBy?: CallOrderBy
  order?: TOrder
  filters: CDRListFilters
}

const init: TInit = {
  CDRList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  isLoading: {},
  orderBy: CallOrderBy.createdAt,
  order: 'DESC',
  filters: {
    date: {
      from: startOfMonth(new Date()).valueOf(),
      to: endOfDay(new Date()).valueOf(),
    },
  },
}

const calls = createSlice({
  name: 'calls',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = calculateNewPage(action.payload)
    },
    setCDRList(state, action: PayloadAction<TCDRList[]>) {
      state.CDRList = action.payload
    },
    setCDRFilters(state, action: PayloadAction<CDRListFilters>) {
      state.filters = action.payload
    },
    addIsLoading(state, action: PayloadAction<string>) {
      state.isLoading[action.payload] = true
    },
    deleteIsLoading(state, action: PayloadAction<string>) {
      delete state.isLoading[action.payload]
    },
    setCallsOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
      // ASC => DESC => clear
      if (action.payload === state.orderBy) {
        if (state.order === ORDER.ASC) {
          state.order = ORDER.DESC
        } else if (state.order === ORDER.DESC) {
          state.orderBy = undefined
          state.order = undefined
        }
      } else {
        state.orderBy = action.payload
        state.order = ORDER.ASC
      }
    },
    reset: () => init,
  },
})

// actions
export const {
  setPagination,
  setCallsOrderBy,
  reset,
  setCDRList,
  setCDRFilters,
  addIsLoading,
  deleteIsLoading,
} = calls.actions

// selectors
export const selectCalls: TSelector<TInit> = (state) => state.calls

export const selectCallsPagination = createSelector(
  selectCalls,
  ({ pagination }) => pagination,
)

export const selectCallsList = createSelector(selectCalls, ({ CDRList }) => CDRList)
export const selectCallsFilters = createSelector(selectCalls, ({ filters }) => filters)
export const selectCallsOrderBy = createSelector(selectCalls, ({ orderBy }) => orderBy)
export const selectCallsOrder = createSelector(selectCalls, ({ order }) => order)

export const selectIsLoading = createSelector(
  selectCalls,
  ({ isLoading }) => Object.keys(isLoading).length > 0,
)

export default calls.reducer

export const getCallsList =
  (
    {
      date,
      ...params
    }: CDRListFilters & Partial<TPagination> & { orderBy?: CallOrderBy; order?: TOrder },
    controller?: AbortController,
  ): TAsyncAction =>
  async (dispatch) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    try {
      dispatch(addIsLoading(requestId))
      const filter = {
        ...params,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        dateFrom: date?.from,
        dateTo: date?.to,
      }
      const { data } = await apiCalls.cdrList(filter, controller)

      const cdrList = data.data
      dispatch(setCDRList(cdrList))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(deleteIsLoading(requestId))
    }
  }

export const getCallsFile = async ({
  date,
  ...params
}: CDRListFilters & { orderBy?: CallOrderBy; order?: TOrder }): Promise<string> => {
  try {
    const filter = {
      ...params,
      dateFrom: date?.from,
      dateTo: date?.to,
    }

    return apiCalls.cdrFile(filter)
  } catch (e) {
    console.error(e)
    throw e
  }
  return ''
}
