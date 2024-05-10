import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { apiAgents } from '@/api-rest/agents'
import { handleRestError } from '@/features/common/error'
import { TAgent, TAgentsReq, TDeletedAgentData } from '@/api-rest/agents/types'
import { TAgentSortBy, TAgentWorkStatus } from '@/features/agents/types'
import { TOrderBy } from '@/types/entities/orderBy'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'

export type TInit = {
  selectedId: null | number | string
  isLoading: boolean
  agentsList: TAgent[]
  activeAgents: TAgent[]
  meta: unknown
  pagination: TPagination
  sort: { sortBy?: TAgentSortBy; orderBy: TOrderBy }
  statusFilter?: TAgentWorkStatus
  deletedAgentData: null | TDeletedAgentData
  searchTerm: string
}

const init: TInit = {
  selectedId: null,
  isLoading: false,
  agentsList: [],
  activeAgents: [],
  meta: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
  },
  sort: { sortBy: undefined, orderBy: 'ASC' },
  statusFilter: undefined,
  deletedAgentData: null,
  searchTerm: '',
}

const agents = createSlice({
  name: 'agents',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setAgentsList(state, action: PayloadAction<TInit['agentsList']>) {
      state.agentsList = action.payload
    },
    setActiveAgents(state, action: PayloadAction<TInit['activeAgents']>) {
      state.activeAgents = action.payload
    },
    setSort(state, action: PayloadAction<TInit['sort']>) {
      state.sort = action.payload
    },
    setStatusFilter(state, action: PayloadAction<TInit['statusFilter']>) {
      state.statusFilter = action.payload
    },
    setDeletedAgentData(state, action: PayloadAction<TInit['deletedAgentData']>) {
      state.deletedAgentData = action.payload
    },
    setSearchTerm(state, action: PayloadAction<TInit['searchTerm']>) {
      state.searchTerm = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setPagination,
  setSelectedId,
  setAgentsList,
  setActiveAgents,
  setSort,
  setStatusFilter,
  setDeletedAgentData,
  setSearchTerm,
  reset,
} = agents.actions

export const selectAgents: TSelector<TInit> = (state) => state.agents

export const selectIsLoadingAgents = createSelector(
  selectAgents,
  ({ isLoading }) => isLoading,
)

export const selectAgentsPagination = createSelector(
  selectAgents,
  ({ pagination }) => pagination,
)

export const selectAgentsList = createSelector(
  selectAgents,
  ({ agentsList }) => agentsList,
)

export const selectSelectedAgent = createSelector(
  selectAgents,
  ({ selectedId, agentsList }) => agentsList.find(({ id }) => id === selectedId),
)

export const selectActiveAgents = createSelector(
  selectAgents,
  ({ activeAgents }) => activeAgents,
)

export const selectAgentsOptions = createSelector(selectAgentsList, (agentsList) =>
  agentsList.map(({ id, username }) => ({ value: id, label: username })),
)

export const selectStatusFilter = createSelector(
  selectAgents,
  ({ statusFilter }) => statusFilter,
)

export const selectSort = createSelector(selectAgents, ({ sort }) => sort)

export const selectSelectedId = createSelector(
  selectAgents,
  ({ selectedId }) => selectedId,
)

export const selectSearchTerm = createSelector(
  selectAgents,
  ({ searchTerm }) => searchTerm,
)

export default agents.reducer

export const asyncGetAgentsList =
  (params: TAgentsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data },
      } = await apiAgents.getAgentsList(params)
      dispatch(setAgentsList(data))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncGetActiveAgents =
  (params: TAgentsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data },
      } = await apiAgents.getActiveAgents(params)
      dispatch(setActiveAgents(data))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncRemoveAgent =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data },
      } = await apiAgents.deleteAgent(id)
      dispatch(setDeletedAgentData(data))
      dispatch(modalsActions.resetModalsState())
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:agent.success-delete',
          status: 'success',
          values: { agentName: data.username ?? '' },
        }),
      )
      dispatch(asyncGetAgentsList({ page: 1, limit: 10, orderBy: 'ASC' }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
