import { useCallback, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { useUnmount } from 'react-use'
import { shallowEqual } from 'react-redux'
import { endOfDay, startOfDay } from 'date-fns'
import { useRedux } from '@/hooks/use-redux'
import {
  selectCampaignsPagination,
  selectFilterDate,
  selectSearchTerm,
  reset,
  resetFilters,
  setFilterDate,
  setSearchTerm,
  setFilterStatus,
  selectFilterStatus,
  selectOrderBy,
  setFilterCampaignIds,
  selectFilterCampaignIds,
  selectOrder,
  selectIsLoading,
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
    filterCampaignIds?: number[]
    filterStatus?: TCampaignStatus
    filterDate?: { from?: string | Date; to?: string | Date }
  }
  handlerResetFilters: (filterType: TFilterType) => void
  isLoading: boolean
}

type TCampaignThunk = (
  params: TActiveCampaignsReq,
) => ThunkAction<void, TRootState, unknown, AnyAction>

export const useCampaignsManager = (
  fetcher: TCampaignThunk,
  refetchTimeout?: number,
): TReturn => {
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page, limit },
    searchTerm,
    filterCampaignIds,
    filterDate,
    filterStatus,
    orderBy,
    order,
    isLoading,
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      searchTerm: selectSearchTerm,
      filterCampaignIds: selectFilterCampaignIds,
      filterDate: selectFilterDate,
      filterStatus: selectFilterStatus,
      orderBy: selectOrderBy,
      order: selectOrder,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const fetchWithParams = (newPage?: number) => {
    const currentParams = {
      page: newPage || page,
      limit,
      orderBy,
      order,
      ...(searchTerm && { search: searchTerm }),
      ...(filterCampaignIds.length > 0 && { ids: filterCampaignIds }),
      ...(filterStatus && { status: filterStatus }),
      ...(filterDate?.from && { fromDate: filterDate?.from }),
      ...(filterDate?.to && { toDate: filterDate?.to }),
    }

    dispatch(fetcher(currentParams))
  }

  useEffect(() => {
    if (refetchTimeout) {
      const interval = setInterval(() => {
        fetchWithParams()
      }, refetchTimeout)

      return () => clearInterval(interval)
    }
  }, [
    refetchTimeout,
    dispatch,
    page,
    limit,
    searchTerm,
    filterCampaignIds,
    filterStatus,
    filterDate,
    orderBy,
    order,
    fetcher,
  ])

  useEffect(() => {
    fetchWithParams(page ?? 1)
  }, [dispatch, limit])

  useEffect(() => {
    fetchWithParams(1)
  }, [searchTerm, filterCampaignIds, filterStatus, filterDate, orderBy, order])

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
          order,
          ...(searchTerm && { search: searchTerm }),
          ...(filterCampaignIds.length > 0 && { ids: filterCampaignIds }),
          ...(filterStatus && { status: filterStatus }),
          ...(filterDate?.from && { fromDate: filterDate?.from }),
          ...(filterDate?.to && { toDate: filterDate?.to }),
        }),
      )
    },
    [
      dispatch,
      limit,
      searchTerm,
      filterCampaignIds,
      filterStatus,
      filterDate,
      orderBy,
      order,
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
    ...(filterCampaignIds.length > 0 && { filterCampaignIds }),
    ...(filterStatus && { filterStatus }),
    ...(filterDate?.from && filterDate?.to && { filterDate }),
  }

  const handlerResetFilters = useCallback((filterType: TFilterType) => {
    if (filterType === FILTER_TYPE.CAMPAIGN_NAME) {
      dispatch(setFilterCampaignIds([]))
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
    isLoading,
  }
}
