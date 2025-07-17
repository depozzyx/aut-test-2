import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsGroup, TLeadsList } from '@/types/leads/leads-list'
import { handleRestError } from '@/features/common/error'
import { leadsApi } from '@/api-rest/leads'
import {
  ELeadsOrderBy,
  TCreateLeadGroupPayload,
  TLeadsGroupReq,
  TLeadsListReq,
  TLeadStatusData,
  TUpsertCustomStatusReq,
} from '@/api-rest/leads/types'
import { TFormik } from '@peiko/types/formik'
import { TOrder } from '@/types/entities/order'
import { ORDER } from '@/constants/order'
import { calculateNewPage } from '@/utils/pagination'
import { TImportError, TImportProgress, TPreparedFiles } from '../types/files'
import { dataURIToBlob } from '../utils/dataURIToBlob'

export type TInit = {
  leadsList: TLeadsList[]
  pagination: TPagination
  isLoading: boolean
  leadsGroups: TLeadsGroup[]
  leadsGroupsPagination: TPagination
  selectedLeadsGroup?: TLeadsGroup['id']
  checkNumberUnique: boolean
  useDefaultStatus: string
  selectError?: string
  filesForImport: TPreparedFiles[]
  orderBy?: ELeadsOrderBy
  order?: TOrder
  statuses: TLeadStatusData[]
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
  checkNumberUnique: false,
  useDefaultStatus: 'fromFile',
  isLoading: true,
  leadsGroups: [{ name: '-', id: 0 }],
  filesForImport: [],
  orderBy: undefined,
  order: undefined,
  statuses: [],
}

const leads = createSlice({
  name: 'leads',
  initialState: init,
  reducers: {
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = calculateNewPage(action.payload)
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
        state.filesForImport.some(
          (item) => item.name === file.name && item.size === file.size,
        )
          ? { ...file, duplicate: true }
          : file,
      )
      state.filesForImport = [...state.filesForImport, ...preparedData]
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
    setCheckNumberUnique(state, action: PayloadAction<boolean>) {
      state.checkNumberUnique = action.payload
    },
    setUseDefaultStatus(state, action: PayloadAction<string>) {
      state.useDefaultStatus = action.payload
    },
    setLeadsOrderBy(state, action: PayloadAction<TInit['orderBy']>) {
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
    setSelectError(state, action: PayloadAction<TInit['selectError']>) {
      state.selectError = action.payload
    },
    setLeadsGroupPagination(
      state,
      action: PayloadAction<TInit['leadsGroupsPagination']>,
    ) {
      state.leadsGroupsPagination = calculateNewPage(action.payload)
    },
    reset: () => init,
    resetLeadGroups(state) {
      state.leadsGroups = []
    },
    setStatuses(state, action: PayloadAction<TLeadStatusData[]>) {
      state.statuses = action.payload
    },
    updateImportFileProgress(state, action: PayloadAction<TImportProgress>) {
      const { id, importProgress } = action.payload
      const file = state.filesForImport.find((f) => f.id === id)
      if (file) {
        // const d = new Date()
        // eslint-disable-next-line no-console
        // console.debug(
        //   `${d.getMinutes()}:${d.getSeconds()} updating progress of ${
        //     file.name
        //   } to ${importProgress}`,
        // )
        file.importProgress = importProgress
      }
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
  updateImportFileProgress,
  updateImportFiles,
  deleteImportFile,
  setSelectError,
  setLeadsGroupPagination,
  setLeadsOrderBy,
  reset,
  resetLeadGroups,
  setCheckNumberUnique,
  setUseDefaultStatus,
  setStatuses,
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

export const selectLeadsOrderBy = createSelector(selectLeads, ({ orderBy }) => orderBy)
export const selectLeadsOrder = createSelector(selectLeads, ({ order }) => order)

export const selectLeadsGroupError = createSelector(
  selectLeads,
  ({ selectError }) => selectError,
)

export const selectIsLoading = createSelector(selectLeads, ({ isLoading }) => isLoading)

export const selectFilesForImport = createSelector(
  selectLeads,
  ({ filesForImport }) => filesForImport,
)

export const selectCheckNumberUnique = createSelector(
  selectLeads,
  ({ checkNumberUnique }) => checkNumberUnique,
)

export const selectUseDefaultStatus = createSelector(
  selectLeads,
  ({ useDefaultStatus }) => useDefaultStatus,
)

export const selectLeadStatuses = createSelector(selectLeads, ({ statuses }) => statuses)

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
    formData: TCreateLeadGroupPayload
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

      const payload = { ...formData, active: formData.active === 'true' }
      const { data } = await leadsApi.createLeadGroup(payload)

      dispatch(resetLeadGroups())

      dispatch(
        getLeadsGroups({ page: 1, limit }, () => dispatch(setLeadsGroup(data.data.id))),
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
    const { filesForImport, selectedLeadsGroup, checkNumberUnique, useDefaultStatus } =
      _store().leads

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

      if (typeof file.data === 'string') {
        formData.append('file', dataURIToBlob(file.data), file.name)
        formData.append('fileId', file.id)
      }
      if (selectedLeadsGroup) formData.append('leadListId', selectedLeadsGroup.toString())
      if (checkNumberUnique)
        formData.append('checkNumberUnique', checkNumberUnique.toString())
      if (useDefaultStatus === 'default') formData.append('useDefaultStatus', 'true')

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
            typedData.errors?.validationErrors[0]?.constraints || {},
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

export const getLeadStatuses = (): TAsyncAction => async (dispatch) => {
  try {
    const data = await leadsApi.getStatuses()
    dispatch(setStatuses(data.data.data))
  } catch (e) {
    handleRestError({ e, dispatch })
  }
}

export const createLeadStatus =
  (status: TUpsertCustomStatusReq): TAsyncAction =>
  async (dispatch) => {
    try {
      await leadsApi.createCustomStatus(status)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

export const updateLeadStatus =
  (id: number, status: TUpsertCustomStatusReq): TAsyncAction =>
  async (dispatch) => {
    try {
      await leadsApi.updateCustomStatus(id, status)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

export const deleteLeadStatus =
  (id: number): TAsyncAction =>
  async (dispatch) => {
    try {
      await leadsApi.deleteCustomStatus(id)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }
