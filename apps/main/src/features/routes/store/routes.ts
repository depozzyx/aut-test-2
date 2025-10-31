import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TRootState, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { notificationActions } from '@/features/common/notifications/store'
import { handleRestError } from '@/features/common/error'
import { calculateNewPage } from '@/utils/pagination'

import {
  TCreateRoute,
  TRoute,
  TRoutesListReq,
  TUpdateRoute,
} from '@/api-rest/routes/types'
import { apiRoutes } from '@/api-rest/routes'

export type TInit = {
  isLoading: boolean
  routes: TRoute[]
  currentRoute: TRoute | null
  pagination: TPagination
}

const init: TInit = {
  isLoading: false,
  routes: [],
  pagination: { page: 1, limit: 10, total: 0 },
  currentRoute: null,
}

const routes = createSlice({
  name: 'routes',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setRoutes(state, action: PayloadAction<{ data: TRoute[]; append?: boolean }>) {
      const { data, append = false } = action.payload
      if (append) {
        state.routes = data.reduce((acc, item) => {
          if (!acc.find((i) => i.id === item.id)) {
            acc.push(item)
          }
          return acc
        }, state.routes.slice())
      } else {
        state.routes = data
      }
    },
    setCurrentRoute(state, action: PayloadAction<TRoute | null>) {
      state.currentRoute = action.payload
    },
    setPagination(state, action: PayloadAction<TInit['pagination']>) {
      state.pagination = calculateNewPage(action.payload)
    },
    reset: () => init,
  },
})

export const { setIsLoading, setRoutes, setPagination, setCurrentRoute, reset } =
  routes.actions

export default routes.reducer

export const selectRoutes: TSelector<TInit> = (s: TRootState): TInit => s.routes as TInit
export const selectRoutesList = createSelector(selectRoutes, ({ routes }) => routes)
export const selectRoutesPagination = createSelector(selectRoutes, (s) => s.pagination)
export const selectCurrentRoute = createSelector(selectRoutes, (s) => s.currentRoute)
export const selectRoutesLoading = createSelector(selectRoutes, (s) => s.isLoading)

export const selectRoutesOptions = createSelector(selectRoutes, ({ routes }) =>
  routes.map(({ id, name }) => ({ value: id, label: name })),
)

export const asyncFetchRoutes =
  (params: TRoutesListReq, append = false, withLoading = true): TAsyncAction =>
  async (dispatch) => {
    try {
      if (withLoading) dispatch(setIsLoading(true))
      const { data } = await apiRoutes.getRoutes(params)
      dispatch(setRoutes({ data: data.data ?? [], append }))
      dispatch(setPagination(data.pagination ?? { page: 1, limit: 10, total: 0 }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      if (withLoading) dispatch(setIsLoading(false))
    }
  }

export const asyncFetchRoute =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiRoutes.getRoute(id)
      dispatch(setCurrentRoute(data ?? null))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncCreateRoute =
  (body: TCreateRoute): TAsyncAction =>
  async (dispatch, store) => {
    const { limit, page } = store().routes.pagination
    try {
      dispatch(setIsLoading(true))
      await apiRoutes.createRoute(body)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:route.success-create',
          status: 'success',
          values: { routeName: body.name },
        }),
      )
      dispatch(asyncFetchRoutes({ page, limit }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const asyncUpdateRoute =
  (id: number, body: TUpdateRoute): TAsyncAction =>
  async (dispatch, store) => {
    const { limit, page } = store().routes.pagination
    try {
      dispatch(setIsLoading(true))
      await apiRoutes.updateRoute(id, body)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:route.success-update',
          status: 'success',
          values: { routeName: body.name },
        }),
      )
      dispatch(asyncFetchRoutes({ page, limit }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const deleteRoute =
  (id: number): TAsyncAction =>
  async (dispatch, store) => {
    const { limit, page } = store().routes.pagination
    try {
      dispatch(setIsLoading(true))
      await apiRoutes.deleteRoute(id)
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:route.success-delete',
          status: 'success',
          values: {},
        }),
      )
      dispatch(asyncFetchRoutes({ page, limit }))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
