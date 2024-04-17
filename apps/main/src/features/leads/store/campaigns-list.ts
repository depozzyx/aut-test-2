import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsList } from '@/types/leads/leads-list'
import { handleRestError } from '@/features/common/error'
import { TLeadsGroup, leadsGroups, leadsMock } from '../mocks/leadsListMock'

export type TInit = {
  leadsList: TLeadsList[]
  pagination: TPagination
  isLoading: boolean
  leadsGroups: TLeadsGroup[]
  selectedLeadsGroup?: TLeadsGroup['value']
}

const init: TInit = {
  leadsList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
  isLoading: true,
  leadsGroups: [],
}

const leadsList = createSlice({
  name: 'leadsList',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload
    },
    setLeadsList(state, action: PayloadAction<TLeadsList[]>) {
      state.leadsList = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setLeadsGroups(state, action: PayloadAction<TLeadsGroup[]>) {
      state.leadsGroups = action.payload
    },
    setLeadsGroup(state, action: PayloadAction<TLeadsGroup['value']>) {
      state.selectedLeadsGroup = action.payload
    },
    reset: () => init,
  },
})

// actions
export const {
  setPagination,
  setLeadsList,
  setIsLoading,
  setLeadsGroups,
  setLeadsGroup,
  reset,
} = leadsList.actions
// selectors

export const selectLeads: TSelector<TInit> = (state) => state.leadsList

export const selectLeadsPagination = createSelector(
  selectLeads,
  ({ pagination }) => pagination,
)

export const selectLeadsList = createSelector(selectLeads, ({ leadsList }) => leadsList)

export const selectLeadsGroups = createSelector(
  selectLeads,
  ({ leadsGroups }) => leadsGroups,
)
export const selectLeadsGroup = createSelector(
  selectLeads,
  ({ selectedLeadsGroup }) => selectedLeadsGroup,
)
export const selectIsLoading = createSelector(selectLeads, ({ isLoading }) => isLoading)

export default leadsList.reducer

export const getLeadList =
  (list?: TLeadsGroup['value']): TAsyncAction =>
  async (dispatch) => {
    if (!list) return
    try {
      dispatch(setIsLoading(true))
      const data = await new Promise<TLeadsList[]>((resolve, reject) => {
        setTimeout(() => {
          const leads = leadsMock[list]
          if (leads) {
            resolve(leads)
          } else {
            reject(new Error('Leads not found'))
          }
        }, 1000)
      })
      dispatch(setLeadsList(data))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const getLeadsGroups = (): TAsyncAction => async (dispatch) => {
  try {
    const data = await new Promise<TLeadsGroup[]>((resolve) => {
      setTimeout(() => {
        resolve(leadsGroups)
      }, 1000)
    })
    if (data.length > 0) dispatch(setLeadsGroup(data[0].value))
    dispatch(setLeadsGroups(data))
  } catch (e) {
    handleRestError({ e, dispatch })
  }
}
