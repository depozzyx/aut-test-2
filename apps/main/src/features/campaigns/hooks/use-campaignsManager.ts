import { useCallback, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { useUnmount } from 'react-use'
import { shallowEqual } from 'react-redux'
import { endOfDay, startOfDay } from 'date-fns'
import { useRedux } from '@/hooks/use-redux'
import {
  selectCampaignsPagination,
  selectFilterCampaignName,
  selectFilterDate,
  selectSearchTerm,
  reset,
  resetFilters,
  setFilterDate,
  setFilterCampaignName,
  setSearchTerm,
  setFilterStatus,
  selectFilterStatus,
  selectSort,
} from '@/features/campaigns/store/campaigns'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { dateToString } from '@/utils/date-to-string'
import { TActiveCampaignsReq } from '@/api-rest/campaigns/types'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { TRootState } from '@/store'
import { TCampaignStatus, TFilterType } from '@/features/campaigns/types'
import { FILTER_TYPE } from '@/features/campaigns/constants'

type TReturn = {
  handleCreateCampaign: () => void
  handleChangePage: (newPage: number) => void
  handleChangeDate: (date: { from?: Date; to?: Date }) => void
  pagination: { total: number; page: number; limit?: number }
  filters: {
    searchTerm?: string
    filterCampaignName?: string | number
    filterStatus?: TCampaignStatus
    filterDate?: { from?: string | Date; to?: string | Date }
  }
  handlerResetFilters: (filterType: TFilterType) => void
}

type TCampaignThunk = (
  params: TActiveCampaignsReq,
) => ThunkAction<void, TRootState, unknown, AnyAction>

export const useCampaignsManager = (fetcher: TCampaignThunk): TReturn => {
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page, limit },
    searchTerm,
    filterCampaignName,
    filterDate,
    filterStatus,
    sort: { sortBy, orderBy },
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      searchTerm: selectSearchTerm,
      filterCampaignName: selectFilterCampaignName,
      filterDate: selectFilterDate,
      filterStatus: selectFilterStatus,
      sort: selectSort,
    }),
    shallowEqual,
  )

  useEffect(() => {
    const currentParams = {
      page,
      limit,
      orderBy,
      ...(searchTerm && { search: searchTerm }),
      ...(filterCampaignName && { name: filterCampaignName as string }),
      ...(filterStatus && { status: filterStatus }),
      ...(filterDate?.from && { fromDate: filterDate?.from }),
      ...(filterDate?.to && { toDate: filterDate?.to }),
      ...(sortBy && { sortBy }),
    }

    dispatch(fetcher(currentParams))
  }, [
    dispatch,
    page,
    limit,
    orderBy,
    searchTerm,
    filterCampaignName,
    filterStatus,
    filterDate,
    sortBy,
  ])

  useUnmount(() => {
    dispatch(reset())
  })

  const handleCreateCampaign = useCallback(() => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }, [])

  const handleChangePage = useCallback(
    (newPage: number) => {
      dispatch(
        fetcher({
          page: newPage,
          limit,
          orderBy,
          ...(searchTerm && { search: searchTerm }),
          ...(filterCampaignName && { name: filterCampaignName as string }),
          ...(filterStatus && { status: filterStatus }),
          ...(filterDate?.from && { fromDate: filterDate?.from }),
          ...(filterDate?.to && { toDate: filterDate?.to }),
          ...(sortBy && { sortBy }),
        }),
      )
    },
    [
      dispatch,
      limit,
      searchTerm,
      filterCampaignName,
      filterStatus,
      filterDate,
      sortBy,
      orderBy,
    ],
  )

  const handleChangeDate = useCallback((date) => {
    const newDate = {
      from: date?.from ? dateToString(startOfDay(date.from)) : undefined,
      to: date?.to ? dateToString(endOfDay(date.to)) : undefined,
    }
    dispatch(setFilterDate(newDate))
  }, [])

  const filters = {
    ...(searchTerm && { searchTerm }),
    ...(filterCampaignName && { filterCampaignName }),
    ...(filterStatus && { filterStatus }),
    ...(filterDate?.from && filterDate?.to && { filterDate }),
  }

  const handlerResetFilters = useCallback((filterType: TFilterType) => {
    if (filterType === FILTER_TYPE.CAMPAIGN_NAME) {
      dispatch(setFilterCampaignName(''))
    } else if (filterType === FILTER_TYPE.DATE) {
      dispatch(
        setFilterDate({
          from: undefined,
          to: undefined,
        }),
      )
    } else if (filterType === FILTER_TYPE.SEARCH) {
      dispatch(setSearchTerm(''))
    } else if (filterType === FILTER_TYPE.STATUS) {
      dispatch(setFilterStatus(undefined))
    } else {
      dispatch(resetFilters())
    }
  }, [])

  return {
    handleCreateCampaign,
    handleChangePage,
    handleChangeDate,
    pagination: { total, page, limit },
    filters,
    handlerResetFilters,
  }
}
