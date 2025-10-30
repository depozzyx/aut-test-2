import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TRootState, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { notificationActions } from '@/features/common/notifications/store'
import { handleRestError } from '@/features/common/error'
import { calculateNewPage } from '@/utils/pagination'
import { apiAgentGroups } from '@/api-rest/users/groups.api'
import {
  TAgentGroup,
  TAgentGroupsReq,
  TCreateAgentGroupReq,
  TUpdateAgentGroupReq,
} from '@/api-rest/users/groups.types'

export type TInit = {
  isLoading: boolean
  groups: TAgentGroup[]
  currentGroup: TAgentGroup | null
  pagination: TPagination
}

const init: TInit = {
  isLoading: false,
  groups: [],
  pagination: { page: 1, limit: 10, total: 0 },
  currentGroup: null,
}

const agentGroups = createSlice({
  name: 'agentGroups',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setGroups(state, action: PayloadAction<{ data: TAgentGroup[]; append?: boolean }>) {
      const { data, append = false } = action.payload
      if (append) {
        state.groups = data.reduce((acc, item) => {
          if (!acc.find((i) => i.id === item.id)) {
            acc.push(item)
          }
          return acc
        }, state.groups.slice())
      } else {
        state.groups = action.payload.data
      }
    },
    setCurrentGroup(state, action: PayloadAction<TAgentGroup | null>) {
      state.currentGroup = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = calculateNewPage(action.payload)
    },
    reset: () => init,
  },
})

export const { setIsLoading, setGroups, setPagination, setCurrentGroup, reset } =
  agentGroups.actions

export default agentGroups.reducer

export const selectAgentGroups: TSelector<TInit> = (s: TRootState): TInit =>
  s.agentGroups as TInit
export const selectAgentGroupsList = createSelector(
  selectAgentGroups,
  ({ groups }) => groups,
)
export const selectAgentGroupsPagination = createSelector(
  selectAgentGroups,
  (s) => s.pagination,
)
export const selectAgentCurrentGroup = createSelector(
  selectAgentGroups,
  (s) => s.currentGroup,
)
export const selectAgentGroupsLoading = createSelector(
  selectAgentGroups,
  (s) => s.isLoading,
)

export const selectAgentGroupsOptions = createSelector(selectAgentGroups, ({ groups }) =>
  groups.map(({ id, name }) => ({ value: id, label: name })),
)

export const asyncFetchAgentGroups =
  (params: TAgentGroupsReq, append = false, withLoading = true): TAsyncAction =>
  async (dispatch) => {
    try {
      if (withLoading) dispatch(setIsLoading(true))
      const { data } = await apiAgentGroups.getGroups(params)
      dispatch(setGroups({ data: data.data ?? [], append }))
      dispatch(setPagination(data.pagination ?? { page: 1, limit: 10, total: 0 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) dispatch(setIsLoading(false))
    }
  }

export const asyncFetchAgentGroup =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiAgentGroups.getGroup(id)
      dispatch(setCurrentGroup(data.data ?? null))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncCreateAgentGroup =
  (body: TCreateAgentGroupReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      await apiAgentGroups.createGroup(body)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:group.created',
          status: 'success',
          values: { groupName: body.name },
        }),
      )
      dispatch(asyncFetchAgentGroups({ page: 1, limit: 10 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncUpdateAgentGroup =
  (id: number, body: TUpdateAgentGroupReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      await apiAgentGroups.updateGroup(id, body)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:group.updated',
          status: 'success',
          values: { groupName: body.name },
        }),
      )
      dispatch(asyncFetchAgentGroups({ page: 1, limit: 10 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const deleteAgentGroup =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const response = await apiAgentGroups.deleteGroup(id)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:group.deleted',
          status: 'success',
          values: { groupName: response.data.data?.name || '' },
        }),
      )
      dispatch(asyncFetchAgentGroups({ page: 1, limit: 10 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
