import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsList } from '@/types/leads/leads-list'
import { handleRestError } from '@/features/common/error'
import { leadsApi } from '@/api-rest/leads'
import { TLeadsListReq } from '@/api-rest/leads/types'
import { TLeadsGroup, leadsGroups } from '../mocks/leadsListMock'
import { TImportError, TPreparedFiles } from '../types/files'
import { dataURIToBlob } from '../utils/dataURIToBlob'

export type TInit = {
  leadsList: TLeadsList[]
  pagination: TPagination
  isLoading: boolean
  leadsGroups: TLeadsGroup[]
  selectedLeadsGroup?: TLeadsGroup['value']
  filesForImport: TPreparedFiles[]
}

const init: TInit = {
  leadsList: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  },
  isLoading: true,
  leadsGroups: [],
  filesForImport: [],
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
      state.leadsGroups = action.payload
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
    setLeadsGroup(state, action: PayloadAction<TLeadsGroup['value']>) {
      state.selectedLeadsGroup = action.payload
    },
    reset: () => init,
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
  reset,
} = leads.actions
// selectors

export const selectLeads: TSelector<TInit> = (state) => state.leads

export const selectLeadsPagination = createSelector(
  selectLeads,
  ({ pagination }) => pagination,
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
  (withInitial?: boolean): TAsyncAction =>
  async (dispatch) => {
    try {
      const data = await new Promise<TLeadsGroup[]>((resolve) => {
        setTimeout(() => {
          resolve(leadsGroups)
        }, 1000)
      })
      if (withInitial && data.length > 0) dispatch(setLeadsGroup(data[0].value))
      dispatch(setLeadsGroups(data))
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

export const importFilesAsync =
  (fileId: string, setController: (controller: AbortController) => void): TAsyncAction =>
  async (dispatch, _store) => {
    const { filesForImport } = _store().leads

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
      handleRestError<TImportError>({
        e,
        dispatch,
        custom: (_, data) => {
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
