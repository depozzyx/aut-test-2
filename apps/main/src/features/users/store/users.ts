import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TOrder } from '@/types/entities/order'
import { notificationActions } from '@/features/common/notifications/store'
import { modalsActions } from '@/features/common/modals/store'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'
import { TUser, TUsersListRes, TUsersReq } from '../../../api/rest/users/types'
import { apiUsers } from '../../../api/rest/users'
import { ERoles } from '../../../constants/profile'
import { TAgentActiveWorkStatus, TUserOrderBy } from '../types'

export type TInit = {
  selectedId: null | number | string
  isLoading: boolean
  usersList: TUser[]
  pagination: TPagination
  orderBy?: TUserOrderBy
  order?: TOrder
  statusFilter?: TAgentActiveWorkStatus
  deletedUserData: null | TUser
  searchTerm: string
}

const init: TInit = {
  selectedId: null,
  isLoading: false,
  usersList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  statusFilter: undefined,
  deletedUserData: null,
  searchTerm: '',
}

const users = createSlice({
  name: 'users',
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
  },
})

export const {
  setIsLoading,
  setPagination,
  setSelectedId,
  setUsersList,
  setOrderBy,
  setStatusFilter,
  setDeletedUserData,
  setSearchTerm,
  reset,
} = users.actions

export const selectUsers: TSelector<TInit> = (state) => state.users

export const selectIsLoadingUsers = createSelector(
  selectUsers,
  ({ isLoading }) => isLoading,
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

const getUsersList = async (role: ERoles, params: TUsersReq): Promise<TUsersListRes> => {
  const res = await apiUsers.getUsersList(role, params)
  return res.data
}

export const asyncGetUsersList =
  (role: ERoles, params: TUsersReq, append = false, withLoading = true): TAsyncAction =>
  async (dispatch) => {
    try {
      if (withLoading) {
        dispatch(setIsLoading(true))
      }
      const data = await getUsersList(role, params)
      dispatch(setUsersList({ data: data.data ?? [], append }))
      dispatch(setPagination(data.pagination ?? { page: 1, limit: 10, total: 0 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) {
        dispatch(setIsLoading(false))
      }
    }
  }

export const asyncRemoveUser =
  (role: ERoles, id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
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
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
