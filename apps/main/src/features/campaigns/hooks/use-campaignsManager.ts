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
  setFilterDate,
} from '@/features/campaigns/store/campaigns'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import useModals from '@/features/common/modals/hooks/use-modals'
import { dateToString } from '@/utils/date-to-string'
import { TActiveCampaignsReq } from '@/api-rest/campaigns/types'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { TRootState } from '@/store'

type TReturn = {
  handleCreateCampaign: () => void
  handleChangePage: (newPage: number) => void
  handleChangeDate: (date: { from?: Date; to?: Date }) => void
  pagination: { total: number; page: number; limit?: number }
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
  } = select(
    createStructuredSelector({
      pagination: selectCampaignsPagination,
      searchTerm: selectSearchTerm,
      filterCampaignName: selectFilterCampaignName,
      filterDate: selectFilterDate,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(
      fetcher({
        page,
        limit,
        orderBy: 'ASC',
        search: searchTerm,
        name: filterCampaignName,
        ...(filterDate?.from && { fromDate: filterDate?.from }),
        ...(filterDate?.to && { toDate: filterDate?.to }),
      }),
    )
  }, [dispatch, page, limit, searchTerm, filterCampaignName, filterDate])

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
          orderBy: 'ASC',
          search: searchTerm,
          name: filterCampaignName,
          ...(filterDate?.from && { fromDate: filterDate?.from }),
          ...(filterDate?.to && { toDate: filterDate?.to }),
        }),
      )
    },
    [dispatch, limit, searchTerm, filterCampaignName, filterDate],
  )

  const handleChangeDate = useCallback((date) => {
    const newDate = {
      from: date?.from ? dateToString(startOfDay(date.from)) : undefined,
      to: date?.to ? dateToString(endOfDay(date.to)) : undefined,
    }
    dispatch(setFilterDate(newDate))
  }, [])

  return {
    handleCreateCampaign,
    handleChangePage,
    handleChangeDate,
    pagination: { total, page, limit },
  }
}
