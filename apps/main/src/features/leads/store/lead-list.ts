import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import uniqBy from 'lodash/uniqBy'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { apiLeadList } from '@/api-rest/lead-list'
import {
  TLeadListCatalogReq,
  TLeadListCatalog,
  TLeadListsReq,
  TLeadListData,
} from '@/api-rest/lead-list/types'

export type TInit = {
  leadListCatalog: TLeadListCatalog[]
  leadLists: TLeadListData[]
  pagination: TPagination
  isLoading: boolean
}

const init: TInit = {
  leadListCatalog: [],
  leadLists: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  isLoading: true,
}

const leadList = createSlice({
  name: 'lead-list',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setLeadListCatalog(
      state,
      action: PayloadAction<{ data: TInit['leadListCatalog']; append?: boolean }>,
    ) {
      if (action.payload.append) {
        state.leadListCatalog = [...state.leadListCatalog, ...action.payload.data]
      } else {
        state.leadListCatalog = action.payload.data
      }
    },
    setLeadLists(state, action: PayloadAction<TInit['leadLists']>) {
      state.leadLists = action.payload
    },
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    reset: () => init,
  },
})

export const { setPagination, setLeadListCatalog, setLeadLists, setIsLoading, reset } =
  leadList.actions

export const selectLeadList: TSelector<TInit> = (state) => state.leadList

export const selectIsLoading = createSelector(
  selectLeadList,
  ({ isLoading }) => isLoading,
)

export const selectLeadListPagination = createSelector(
  selectLeadList,
  ({ pagination }) => pagination,
)

export const selectLeadListCatalog = createSelector(
  selectLeadList,
  ({ leadListCatalog }) => leadListCatalog,
)

export const selectLeadLists = createSelector(
  selectLeadList,
  ({ leadLists }) => leadLists,
)

export const selectLeadListCatalogAsOptions = createSelector(
  selectLeadListCatalog,
  (leadListCatalog) =>
    uniqBy(leadListCatalog, 'id').map((leadList) => ({
      label: leadList.name,
      value: leadList.id,
    })),
)

export default leadList.reducer

export const asyncGetLeadListCatalog =
  (params: TLeadListCatalogReq, append = false, withLoading = true): TAsyncAction =>
  async (dispatch) => {
    try {
      if (withLoading) {
        dispatch(setIsLoading(true))
      }
      const { data } = await apiLeadList.getLeadListCatalog(params)

      dispatch(setLeadListCatalog({ data: data.data, append }))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) {
        dispatch(setIsLoading(false))
      }
    }
  }

export const asyncGetLeadLists =
  (params: TLeadListsReq, withLoading = true): TAsyncAction =>
  async (dispatch) => {
    try {
      if (withLoading) {
        dispatch(setIsLoading(true))
      }
      const { data } = await apiLeadList.getLeadLists(params)

      dispatch(setLeadLists(data.data.data))
      dispatch(setPagination(data.data.pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) {
        dispatch(setIsLoading(false))
      }
    }
  }
