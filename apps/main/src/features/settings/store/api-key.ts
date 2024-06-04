import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mutate } from 'swr'
import { TSelector, TAsyncAction } from '@/store'
import { notificationActions } from '@/features/common/notifications/store'
import { TPagination } from '@/types/entities/pagination'
import { TOrderBy } from '@/types/entities/orderBy'
import { handleRestError } from '@/features/common/error'
import { modalsActions } from '@/features/common/modals/store'
import { managerApi } from '@/api-rest/manager'
import { TApiKey } from '@/api-rest/manager/types'
import { MODAL_NAMES } from '@/features/common/modals/constants'

export type TInit = {
  isLoading: boolean
  pagination: TPagination
  apiKeysList: TApiKey[]
  selectedId: number | null
  sortFilter: TOrderBy
  createdApiKey: TApiKey | null
}

const init: TInit = {
  isLoading: false,
  pagination: {
    page: 1,
    limit: 8,
    total: 1,
  },
  apiKeysList: [],
  selectedId: null,
  sortFilter: 'ASC',
  createdApiKey: null,
}

const apiKey = createSlice({
  name: 'api-key',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setApiKeysList(state, action: PayloadAction<TInit['apiKeysList']>) {
      state.apiKeysList = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = action.payload
    },
    setSelectedId(state, action: PayloadAction<TInit['selectedId']>) {
      state.selectedId = action.payload
    },
    setSortFilter(state, action: PayloadAction<TInit['sortFilter']>) {
      state.sortFilter = action.payload
    },
    setCreatedApiKey(state, action: PayloadAction<TInit['createdApiKey']>) {
      state.createdApiKey = action.payload
    },
    reset: () => init,
  },
})

export const {
  setIsLoading,
  setApiKeysList,
  setPagination,
  setSelectedId,
  setSortFilter,
  setCreatedApiKey,
  reset,
} = apiKey.actions

export const selectApiKeyState: TSelector<TInit> = (state) => state.apiKey

export const selectApiKeysLoading = createSelector(
  selectApiKeyState,
  (state) => state.isLoading,
)

export const selectPagination = createSelector(
  selectApiKeyState,
  (state) => state.pagination,
)

export const selectApiKeysList = createSelector(
  selectApiKeyState,
  (state) => state.apiKeysList,
)

export const selectSelectedId = createSelector(
  selectApiKeyState,
  (state) => state.selectedId,
)

export const selectSortFilter = createSelector(
  selectApiKeyState,
  (state) => state.sortFilter,
)

export const selectCreatedApiKey = createSelector(
  selectApiKeyState,
  (state) => state.createdApiKey,
)

export default apiKey.reducer

export const generateApiKey = (): TAsyncAction => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    const { data } = await managerApi.postManagerApiKey()
    dispatch(setCreatedApiKey(data.data))
    dispatch(
      modalsActions.setModal({
        modalName: MODAL_NAMES.CONFIRM_NEW_API_KEY,
        isOpen: true,
      }),
    )
    mutate(['/manager/api-key', 1, 8, 'ASC'])
  } catch (e) {
    handleRestError({ e, dispatch })
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const revokeApiKey = (): TAsyncAction => async (dispatch, getState) => {
  try {
    dispatch(setIsLoading(true))
    const { selectedId } = getState().apiKey
    await managerApi.removeManagerApiKeyById(selectedId as number)
    dispatch(
      modalsActions.setModal({
        modalName: MODAL_NAMES.CONFIRM_NEW_API_KEY,
        isOpen: true,
      }),
    )
    dispatch(
      notificationActions.setNotification({
        key: 'notifications:api-key.success-revoke',
        status: 'success',
        values: {},
      }),
    )
    mutate(['/manager/api-key', 1, 8, 'ASC'])
  } catch (e) {
    handleRestError({ e, dispatch })
    dispatch(
      notificationActions.setNotification({
        key: 'notifications:api-key.unable-revoke',
        status: 'error',
        values: {},
      }),
    )
  } finally {
    dispatch(setIsLoading(false))
    dispatch(modalsActions.resetModalsState())
  }
}
