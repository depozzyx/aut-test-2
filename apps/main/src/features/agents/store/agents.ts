import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { apiAgents } from '@/api-rest/agents'
import { handleRestError } from '@/features/common/error'
import {
  TActiveAgent,
  TAgent,
  TAgentsReq,
  TAssignedCampaign,
  TDeletedAgentData,
} from '@/api-rest/agents/types'
import { TAgentActiveWorkStatus, TAgentOrderBy } from '@/features/agents/types'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'

export type TInit = {
  selectedId: null | number | string
  isLoading: boolean
  agentsList: TAgent[]
  activeAgents: TActiveAgent[]
  pagination: TPagination
  orderBy?: TAgentOrderBy
  order?: TOrder
  statusFilter?: TAgentActiveWorkStatus
  deletedAgentData: null | TDeletedAgentData
  searchTerm: string
  selectedAssignedCampaign: null | TAssignedCampaign
  selectedCampaignId: null | string
  isAgentOnline: boolean // New state for agent online status
}

const init: TInit = {
  selectedId: null,
  isLoading: false,
  agentsList: [],
  activeAgents: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  statusFilter: undefined,
  deletedAgentData: null,
  searchTerm: '',
  selectedAssignedCampaign: null,
  selectedCampaignId: null,
  isAgentOnline: false,
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
      state.pagination = calculateNewPage(action.payload)
    },
    setAgentsList(
      state,
      action: PayloadAction<{ data: TInit['agentsList']; append?: boolean }>,
    ) {
      if (action.payload.append) {
        state.agentsList = [...state.agentsList, ...action.payload.data]
      } else {
        state.agentsList = action.payload.data
      }
    },
    setActiveAgents(state, action: PayloadAction<TInit['activeAgents']>) {
      state.activeAgents = action.payload
    },
    setOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
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
    setOrder(state, action: PayloadAction<TInit['order']>) {
      state.order = action.payload
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
    setSelectedAssignedCampaign(
      state,
      action: PayloadAction<TInit['selectedAssignedCampaign']>,
    ) {
      state.selectedAssignedCampaign = action.payload
    },
    setSelectedCampaignId(state, action: PayloadAction<TInit['selectedCampaignId']>) {
      // eslint-disable-next-line no-console
      console.debug(`setSelectedCampaignId => ${action.payload}`) // todo debug
      state.selectedCampaignId = action.payload
    },
    setIsAgentOnline(state, action: PayloadAction<TInit['isAgentOnline']>) {
      state.isAgentOnline = action.payload
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
  setOrderBy,
  setStatusFilter,
  setDeletedAgentData,
  setSearchTerm,
  setSelectedAssignedCampaign,
  setSelectedCampaignId,
  setIsAgentOnline, // New action
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

export const selectOrderBy = createSelector(selectAgents, ({ orderBy }) => orderBy)
export const selectOrder = createSelector(selectAgents, ({ order }) => order)

export const selectSelectedId = createSelector(
  selectAgents,
  ({ selectedId }) => selectedId,
)

export const selectSelectedCampaignId = createSelector(
  selectAgents,
  ({ selectedCampaignId }) => selectedCampaignId,
)

export const selectSearchTerm = createSelector(
  selectAgents,
  ({ searchTerm }) => searchTerm,
)

export const selectAssignedCampaignsInfo = createSelector(
  selectAgents,
  ({ selectedAssignedCampaign }) => selectedAssignedCampaign,
)

export default agents.reducer

export const asyncGetActiveAgents =
  (params: TAgentsReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const {
        data: { data, pagination },
      } = await apiAgents.getActiveAgents(params)
      dispatch(setActiveAgents(data))
      dispatch(setPagination(pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
