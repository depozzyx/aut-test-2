import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'
import { startOfMonth, endOfDay } from 'date-fns'

import { apiReports } from '../../../api/rest/reports'
import {
  CampaignStatistic,
  CampaignStatisticFields,
  CampaignStatisticOrderBy,
} from '../../../api/rest/reports/types'

export type ReportsFilters = {
  leadListId?: number
  campaignId?: number
  onlyActive?: boolean
  status?: string
  agentGroupId?: number
  agentId?: number
  country?: string
  disposition?: string
  date?: { from?: number; to?: number }
}

export type TInit = {
  campaignStatistics: CampaignStatistic
  pagination: TPagination
  isLoading: boolean
  orderBy?: CampaignStatisticOrderBy
  order?: TOrder
  filters: ReportsFilters
  groupBy: CampaignStatisticFields[]
}

const init: TInit = {
  campaignStatistics: {
    rows: [],
    total: {
      callsCount: 0,
      leadsCount: 0,
      duration: 0,
      talkTime: 0,
      onCallTime: 0,
      avgOnCallTime: 0,
      callsPerHour: 0,
      avgTalkTime: 0,
      callsPerTalkHour: 0,
    },
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  isLoading: false,
  orderBy: CampaignStatisticOrderBy.groups,
  order: 'DESC',
  filters: {
    date: {
      from: startOfMonth(new Date()).valueOf(),
      to: endOfDay(new Date()).valueOf(),
    },
  },
  groupBy: [CampaignStatisticFields.leadList, CampaignStatisticFields.status],
}

const reports = createSlice({
  name: 'reports',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = calculateNewPage(action.payload)
    },
    setCampaignStatistics(state, action: PayloadAction<CampaignStatistic>) {
      state.campaignStatistics = action.payload
    },
    setCampaignStatisticsFilters(state, action: PayloadAction<ReportsFilters>) {
      state.filters = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setCampaignStatisticsGroupBy(
      state,
      action: PayloadAction<CampaignStatisticFields[]>,
    ) {
      state.groupBy = action.payload
    },
    setCampaignStatisticsOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
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
    setCampaignStatisticsOrder(state, action: PayloadAction<TInit['order']>) {
      state.order = action.payload
    },
    reset: () => init,
  },
})

// actions
export const {
  setPagination,
  setIsLoading,
  setCampaignStatisticsOrderBy,
  setCampaignStatisticsOrder,
  reset,
  setCampaignStatistics,
  setCampaignStatisticsGroupBy,
  setCampaignStatisticsFilters,
} = reports.actions

// selectors
export const selectReports: TSelector<TInit> = (state) => state.reports

export const selectReportsPagination = createSelector(
  selectReports,
  ({ pagination }) => pagination,
)

export const selectCampaignStatistics = createSelector(
  selectReports,
  ({ campaignStatistics }) => campaignStatistics,
)
export const selectReportsFilters = createSelector(
  selectReports,
  ({ filters }) => filters,
)
export const selectReportsOrderBy = createSelector(
  selectReports,
  ({ orderBy }) => orderBy,
)
export const selectReportsGroupBy = createSelector(
  selectReports,
  ({ groupBy }) => groupBy,
)
export const selectReportsOrder = createSelector(selectReports, ({ order }) => order)
export const selectIsLoading = createSelector(selectReports, ({ isLoading }) => isLoading)

export default reports.reducer

export const getCampaignStatistics =
  ({
    filter,
    order,
    orderBy,
    groupBy,
    type,
  }: {
    filter?: ReportsFilters
    order?: 'ASC' | 'DESC'
    orderBy?: CampaignStatisticOrderBy
    groupBy: CampaignStatisticFields[]
    type: 'calls' | 'leads'
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      if (groupBy.length === 0) {
        dispatch(
          setCampaignStatistics({ rows: [], total: init.campaignStatistics.total }),
        )
        return
      }
      const { date, ...filters } = filter || {}
      const reqFilter = {
        ...filters,
        dateFrom: date?.from,
        dateTo: date?.to,
      }
      const { data } = await apiReports.campaignStatistics({
        order,
        groupBy,
        orderBy,
        filter: reqFilter,
        type,
      })

      const campaignStatistics = data
      dispatch(setCampaignStatistics(campaignStatistics.data))
      // dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const getCampaignStatisticsDownload = async ({
  filter,
  order,
  orderBy,
  groupBy,
  type,
  format,
}: {
  filter?: ReportsFilters
  order?: 'ASC' | 'DESC'
  orderBy?: CampaignStatisticOrderBy
  groupBy: CampaignStatisticFields[]
  type: 'calls' | 'leads'
  format: 'xlsx' | 'csv'
}): Promise<string> => {
  try {
    const { date, ...filters } = filter || {}
    const reqFilter = {
      ...filters,
      dateFrom: date?.from,
      dateTo: date?.to,
    }
    return apiReports.campaignStatisticsDownload({
      order,
      groupBy,
      orderBy,
      filter: reqFilter,
      type,
      format,
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}
