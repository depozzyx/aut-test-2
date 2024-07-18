import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup, TLeadsList } from '@/types/leads/leads-list'
import { handleRestError } from '@/features/common/error'
import { leadsApi } from '@/api-rest/leads'
import {
  ELeadsSortBy,
  TCreateLeadGroupReq,
  TLeadsGroupReq,
  TLeadsListReq,
} from '@/api-rest/leads/types'
import { TFormik } from '@peiko/types/formik'
import { TOrderBy } from '@/types/entities/orderBy'
import { TImportError, TPreparedFiles } from '../types/files'
import { dataURIToBlob } from '../utils/dataURIToBlob'

export type TInit = {
  leadsList: TLeadsList[]
  pagination: TPagination
  isLoading: boolean
  leadsGroups: TLeadsGroup[]
  leadsGroupsPagination: TPagination
  selectedLeadsGroup?: TLeadsGroup['id']
  selectError?: string
  filesForImport: TPreparedFiles[]
  sortBy?: ELeadsSortBy
  orderBy: TOrderBy
}

const init: TInit = {
  leadsList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  leadsGroupsPagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  isLoading: true,
  leadsGroups: [],
  filesForImport: [],
  orderBy: 'DESC',
}

const leads = createSlice({
  name: 'leads',
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
      state.leadsGroups = [...state.leadsGroups, ...action.payload]
    },
    setImportFiles(state, action: PayloadAction<TInit['filesForImport']>) {
      const preparedData: TInit['filesForImport'] = action.payload.map((file) =>
        state.filesForImport.find(
          (item) => item.name === file.name && item.size === file.size,
        )
          ? { ...file, duplicate: true }
          : file,
      )
      state.filesForImport = state.filesForImport.concat(preparedData)
    },
    updateImportFiles(state, action: PayloadAction<TInit['filesForImport']>) {
      state.filesForImport = action.payload
    },
    deleteImportFile(state, action: PayloadAction<string>) {
      state.filesForImport = state.filesForImport.filter(
        (item) => item.id !== action.payload,
      )
    },
    setLeadsGroup(state, action: PayloadAction<TLeadsGroup['id']>) {
      state.selectedLeadsGroup = action.payload
    },
    setLeadsSortBy(state, action: PayloadAction<TInit['sortBy']>) {
      if (action.payload === state.sortBy)
        state.orderBy = state.orderBy === 'DESC' ? 'ASC' : 'DESC'
      state.sortBy = action.payload
    },
    setSelectError(state, action: PayloadAction<TInit['selectError']>) {
      state.selectError = action.payload
    },
    setLeadsGroupPagination(
      state,
      action: PayloadAction<TInit['leadsGroupsPagination']>,
    ) {
      state.leadsGroupsPagination = action.payload
    },
    reset: () => init,
    resetLeadGroups(state) {
      state.leadsGroups = []
    },
  },
})

// actions
export const {
  setPagination,
  setLeadsList,
  setIsLoading,
  setLeadsGroups,
  setLeadsGroup,
  setImportFiles,
  updateImportFiles,
  deleteImportFile,
  setSelectError,
  setLeadsGroupPagination,
  setLeadsSortBy,
  reset,
  resetLeadGroups,
} = leads.actions
// selectors

export const selectLeads: TSelector<TInit> = (state) => state.leads

export const selectLeadsPagination = createSelector(
  selectLeads,
  ({ pagination }) => pagination,
)

export const selectLeadsGroupPagination = createSelector(
  selectLeads,
  ({ leadsGroupsPagination }) => leadsGroupsPagination,
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

export const selectLeadsSortBy = createSelector(selectLeads, ({ sortBy }) => sortBy)
export const selectLeadsOrderBy = createSelector(selectLeads, ({ orderBy }) => orderBy)

export const selectLeadsGroupError = createSelector(
  selectLeads,
  ({ selectError }) => selectError,
)

export const selectIsLoading = createSelector(selectLeads, ({ isLoading }) => isLoading)

export const selectFilesForImport = createSelector(
  selectLeads,
  ({ filesForImport }) => filesForImport,
)

export default leads.reducer

export const getLeadList =
  (params: TLeadsListReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await leadsApi.leadsList(params)

      dispatch(setLeadsList(data.data))
      dispatch(setPagination(data.pagination))
    } catch (e) {
      handleRestError({ e, dispatch })
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const getLeadsGroups =
  (params: TLeadsGroupReq, onSuccess?: () => void): TAsyncAction =>
  async (dispatch) => {
    try {
      const data = await leadsApi.leadsGroup(params)
      dispatch(setLeadsGroups(data.data.data))
      dispatch(setLeadsGroupPagination(data.data.pagination))
      onSuccess?.()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

export const createLeadsGroups =
  ({
    formik,
    formData,
    onSuccess,
  }: {
    formData: TCreateLeadGroupReq
    formik: TFormik
    onSuccess: () => void
  }): TAsyncAction =>
  async (dispatch, _store) => {
    try {
      const {
        leads: {
          leadsGroupsPagination: { limit },
        },
      } = _store()

      const { data } = await leadsApi.createLeadGroup(formData)

      dispatch(resetLeadGroups())

      dispatch(
        getLeadsGroups({ page: 1, limit, orderBy: 'DESC' }, () =>
          dispatch(setLeadsGroup(data.data.id)),
        ),
      )
      onSuccess()
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      formik.setSubmitting(false)
    }
  }

export const importFilesAsync =
  (fileId: string, setController: (controller: AbortController) => void): TAsyncAction =>
  async (dispatch, _store) => {
    const { filesForImport, selectedLeadsGroup } = _store().leads

    const file = filesForImport.find((item) => item.id === fileId)
    if (!file) return

    const controller = new AbortController()
    setController(controller)

    try {
      dispatch(
        updateImportFiles(
          filesForImport.map((item) => {
            if (item.duplicate) return item
            if (item.id === file.id) return { ...file, startImporting: true }
            return item
          }),
        ),
      )

      const formData = new FormData()

      if (typeof file.data === 'string')
        formData.append('file', dataURIToBlob(file.data), file.name)
      if (selectedLeadsGroup) formData.append('leadListId', selectedLeadsGroup.toString())

      await leadsApi.importLeads(formData, controller)

      dispatch(
        updateImportFiles(
          filesForImport.map((item) => {
            if (item.duplicate) return item
            if (item.id === file.id) return { ...file, imported: true }
            return item
          }),
        ),
      )
    } catch (e) {
      handleRestError({
        e,
        dispatch,
        custom: (_, data) => {
          if (data.statusCode === 422) {
            const { leadListId } = data.message as unknown as { leadListId: string }
            dispatch(setSelectError(leadListId))
            return false
          }
          const typedData = data as unknown as TImportError
          const messages = Object.values(
            typedData.errors.validationErrors[0]?.constraints,
          )

          dispatch(
            updateImportFiles(
              filesForImport.map((item) => {
                if (item.duplicate) return item
                if (item.id === file.id) return { ...file, error: messages }
                return item
              }),
            ),
          )
          return true
        },
      })
    }
  }
