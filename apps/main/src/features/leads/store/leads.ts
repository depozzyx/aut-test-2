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
  useDefaultStatus: string
  selectError?: string
  filesForImport: TPreparedFiles[]
  orderBy?: ELeadsOrderBy
  order?: TOrder
  statuses: TLeadStatusData[]
  leadIsChecking: boolean
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
  useDefaultStatus: 'fromFile',
  isLoading: false,
  leadsGroups: [{ name: '-', id: 0 }],
  filesForImport: [],
  orderBy: undefined,
  order: undefined,
  statuses: [],
  leadIsChecking: false,
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
      leadsApi.importCancelLeads({ fileIds: [action.payload] })
      state.filesForImport = state.filesForImport.filter(
        (item) => item.id !== action.payload,
      )
    },
    cancelImportFiles(state) {
      leadsApi.importCancelLeads({ fileIds: state.filesForImport.map((file) => file.id) })
      state.filesForImport = []
    },
    setLeadsGroup(state, action: PayloadAction<TLeadsGroup['id']>) {
      state.selectedLeadsGroup = action.payload
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
        file.importProgress = importProgress
      }
    },
    setLeadIsChecking(state, action: PayloadAction<boolean>) {
      state.leadIsChecking = action.payload
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
  cancelImportFiles,
  setSelectError,
  setLeadsGroupPagination,
  setLeadsOrderBy,
  reset,
  resetLeadGroups,
  setLeadIsChecking,
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

export const selectLeadIsChecking = createSelector(
  selectLeads,
  ({ leadIsChecking }) => leadIsChecking,
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
    const { filesForImport, selectedLeadsGroup, useDefaultStatus } = _store().leads

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
        formData.append(
          'fileIds',
          filesForImport
            .filter((item) => !item.error?.length)
            .map((item) => item.id)
            .join(','),
        )
      }
      if (selectedLeadsGroup) formData.append('leadListId', selectedLeadsGroup.toString())
      if (useDefaultStatus === 'default') formData.append('useDefaultStatus', 'true')

      const { data } = await leadsApi.importLeads(formData, controller)

      dispatch(
        updateImportFiles(
          filesForImport.map((item) => {
            if (item.duplicate) return item
            if (item.id === file.id)
              return {
                ...file,
                imported: true,
                uploadProgress: 100,
                unknownStatuses: data.data.unknownStatuses?.map((status) => ({
                  status,
                  createNew: false,
                })),
                unknownStatusesNotFixed: (data.data?.unknownStatuses?.length ?? 0) > 0,
                duplicatedPhoneNumbers: data.data.duplicatedPhoneNumbers,
                duplicatedPhoneNotFixed:
                  (data.data?.duplicatedPhoneNumbers?.length ?? 0) > 0,
              }
            return item
          }),
        ),
      )
    } catch (e) {
      handleRestError({
        e,
        dispatch,
        custom: (_, data) => {
          const messages = data.response?.message
            ? [data.response?.message]
            : ['Errors occurred during import']

          const typedData = data.response as unknown as TImportError

          dispatch(
            updateImportFiles(
              filesForImport.map((item) => {
                if (item.duplicate) return item
                if (item.id === file.id)
                  return {
                    ...file,
                    uploadProgress: 100,
                    error: messages,
                    validationErrors: typedData.validationErrors,
                    unknownStatuses: typedData.unknownStatuses?.map((status) => ({
                      status,
                      createNew: false,
                    })),
                    unknownStatusesNotFixed: (typedData.unknownStatuses?.length ?? 0) > 0,
                    duplicatedPhoneNumbers: typedData.duplicatedPhoneNumbers,
                    duplicatedPhoneNotFixed:
                      (typedData?.duplicatedPhoneNumbers?.length ?? 0) > 0,
                  }
                return item
              }),
            ),
          )
          return true
        },
      })
    }
  }

export const importFilesCheckAsync = (): TAsyncAction => async (dispatch, _store) => {
  const { filesForImport, selectedLeadsGroup } = _store().leads

  if (!selectedLeadsGroup) return

  try {
    dispatch(setLeadIsChecking(true))
    const { data } = await leadsApi.importCheckLeads({
      fileIds: filesForImport.map((item) => item.id),
      leadListId: selectedLeadsGroup,
    })

    dispatch(
      updateImportFiles(
        filesForImport.map((item) => {
          const fileDuplicates = data.data.find((dup) => dup.fileId === item.id)
          return {
            ...item,
            duplicatedPhoneNumbers: fileDuplicates?.duplicatedPhoneNumbers ?? [],
            duplicatedPhoneNotFixed:
              (fileDuplicates?.duplicatedPhoneNumbers?.length ?? 0) > 0,
          }
        }),
      ),
    )
  } catch (e) {
    handleRestError({
      e,
      dispatch,
      custom: (_, data) => {
        const messages = data?.message
          ? data?.message
          : 'Errors occurred during files duplication check'
        dispatch(setSelectError(messages))
      },
    })
  } finally {
    dispatch(setLeadIsChecking(false))
  }
}

export const importFilesSubmitAsync = (): TAsyncAction => async (dispatch, _store) => {
  const store = _store().leads
  const { filesForImport, selectedLeadsGroup, useDefaultStatus } = store
  dispatch(setIsLoading(true))
  const fileIds = filesForImport
    .filter((item) => !item.error?.length)
    .map((item: TPreparedFiles) => ({
      fileId: item.id,
      unknownStatuses: item.unknownStatuses,
    }))
  if (!fileIds.length || !selectedLeadsGroup) return

  try {
    await leadsApi.importSubmitLeads({
      fileIds,
      leadListId: selectedLeadsGroup,
      useDefaultStatus: useDefaultStatus === 'default',
    })
  } catch (e) {
    handleRestError({
      e,
      dispatch,
      custom: (_, data) => {
        let messages = 'Errors occurred during files file import'
        if (data?.message) {
          if (Array.isArray(data.message)) {
            messages = data.message.join(', ')
          } else if (typeof data.message === 'object') {
            messages = Object.values(data.message).join(', ')
          } else {
            messages = data.message
          }
        }
        dispatch(setSelectError(messages))
        return true
      },
    })
  }
}

export const importFilesCancelAsync = (): TAsyncAction => async (dispatch, _store) => {
  const { filesForImport } = _store().leads
  const fileIds = filesForImport.map((item: TPreparedFiles) => item.id)
  if (!fileIds.length) return

  await leadsApi.importCancelLeads({ fileIds })

  dispatch(cancelImportFiles())
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
