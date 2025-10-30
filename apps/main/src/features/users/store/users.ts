import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TOrder } from '@/types/entities/order'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'
import { ERoles } from '@/constants/profile'
import { TUser, TUsersListRes, TUsersReq } from '@/api-rest/users/types'
import { apiUsers } from '@/api-rest/users'
import { TAgentActiveWorkStatus, TUserOrderBy } from '../types'

export type TInit = {
  selectedId: null | number | string
  usersList: TUser[]
  pagination: TPagination
  orderBy?: TUserOrderBy
  order?: TOrder
  statusFilter?: TAgentActiveWorkStatus
  deletedUserData: null | TUser
  searchTerm: string
  requestsQueue: Record<string, boolean>
}

const init: TInit = {
  selectedId: null,
  usersList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  statusFilter: undefined,
  deletedUserData: null,
  searchTerm: '',
  requestsQueue: {},
}

const users = createSlice({
  name: 'users',
  initialState: init,
  reducers: {
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = calculateNewPage(action.payload)
    },
    setUsersList(
      state,
      action: PayloadAction<{ data: TInit['usersList']; append?: boolean }>,
    ) {
      if (action.payload.append) {
        state.usersList = action.payload.data.reduce((acc, item) => {
          if (!acc.find((i) => i.id === item.id)) {
            acc.push(item)
          }
          return acc
        }, state.usersList.slice())
      } else {
        state.usersList = action.payload.data
      }
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
    setDeletedUserData(state, action: PayloadAction<TInit['deletedUserData']>) {
      state.deletedUserData = action.payload
    },
    setSearchTerm(state, action: PayloadAction<TInit['searchTerm']>) {
      state.searchTerm = action.payload
    },
    reset: () => init,
    addRequest(state, action: PayloadAction<string>) {
      state.requestsQueue[action.payload] = true
    },
    deleteRequest(state, action: PayloadAction<string>) {
      delete state.requestsQueue[action.payload]
    },
  },
})

export const {
  setPagination,
  setSelectedId,
  setUsersList,
  setOrderBy,
  setStatusFilter,
  setDeletedUserData,
  setSearchTerm,
  reset,
  addRequest,
  deleteRequest,
} = users.actions

export const selectUsers: TSelector<TInit> = (state) => state.users

export const selectIsLoadingUsers = createSelector(
  selectUsers,
  ({ requestsQueue }) => Object.keys(requestsQueue).length > 0,
)

export const selectUsersPagination = createSelector(
  selectUsers,
  ({ pagination }) => pagination,
)

export const selectUsersList = createSelector(selectUsers, ({ usersList }) => usersList)

export const selectSelectedUser = createSelector(
  selectUsers,
  ({ selectedId, usersList }) => usersList.find(({ id }) => id === selectedId),
)

export const selectUsersOptions = createSelector(selectUsersList, (usersList) =>
  usersList.map(({ id, username }) => ({ value: id, label: username })),
)

export const selectStatusFilter = createSelector(
  selectUsers,
  ({ statusFilter }) => statusFilter,
)

export const selectOrderBy = createSelector(selectUsers, ({ orderBy }) => orderBy)
export const selectOrder = createSelector(selectUsers, ({ order }) => order)

export const selectSelectedId = createSelector(
  selectUsers,
  ({ selectedId }) => selectedId,
)

export const selectSearchTerm = createSelector(
  selectUsers,
  ({ searchTerm }) => searchTerm,
)

export default users.reducer

const getUsersList = async (
  role: ERoles,
  params: TUsersReq,
  controller?: AbortController,
): Promise<TUsersListRes> => {
  const res = await apiUsers.getUsersList(role, params, controller)
  return res.data
}

export const getGroupsUsers = async (
  role: ERoles,
  groupIds: number[],
): Promise<TUser[]> => {
  if (groupIds.length === 0) return []
  const res = await apiUsers.getGroupsUsers(role, groupIds)
  return res.data.data ?? []
}

export const asyncGetUsersList =
  (
    role: ERoles,
    params: TUsersReq,
    append = false,
    withLoading = true,
    controller: AbortController | undefined = undefined,
  ): TAsyncAction =>
  async (dispatch) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    try {
      if (withLoading) {
        dispatch(addRequest(requestId))
      }
      const data = await getUsersList(role, params, controller)
      dispatch(setUsersList({ data: data.data ?? [], append }))
      dispatch(setPagination(data.pagination ?? { page: 1, limit: 10, total: 0 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) {
        dispatch(deleteRequest(requestId))
      }
    }
  }

export const asyncRemoveUser =
  (role: ERoles, id: number): TAsyncAction =>
  async (dispatch) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    try {
      dispatch(addRequest(requestId))
      const {
        data: { data },
      } = await apiUsers.deleteUser(role, id)
      dispatch(setDeletedUserData(data))
      dispatch(modalsActions.resetModalsState())
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:user.success-delete',
          status: 'success',
          values: { userName: data.username ?? '', role },
        }),
      )
      dispatch(
        asyncGetUsersList(role, {
          page: 1,
          limit: 10,
          showBlocked: true,
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(deleteRequest(requestId))
    }
  }

export const asyncToggleBlockUser =
  (role: ERoles, id: number): TAsyncAction =>
  async (dispatch) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    try {
      dispatch(addRequest(requestId))
      const {
        data: { data },
      } = await apiUsers.toggleBlockUser(role, id)
      dispatch(modalsActions.resetModalsState())
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:user.success-toggle-block',
          status: 'success',
          values: { userName: data.username ?? '', role },
        }),
      )
      dispatch(
        asyncGetUsersList(role, {
          page: 1,
          limit: 10,
          showBlocked: true,
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(deleteRequest(requestId))
    }
  }
