import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TPagination } from '@/types/entities/pagination'
import { TLeadsList } from '@/types/leads/leads-list'
import { handleRestError } from '@/features/common/error'
import { TLeadsGroup, leadsGroups, leadsMock } from '../mocks/leadsListMock'
import { TPreparedFiles } from '../types/files'

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
    total: 10,
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
  (list?: TLeadsGroup['value']): TAsyncAction =>
  async (dispatch) => {
    if (!list) return
    try {
      dispatch(setIsLoading(true))
      const data = await new Promise<TLeadsList[]>((resolve, reject) => {
        setTimeout(() => {
          const leads = leadsMock[list]
          if (leads) {
            resolve(leads)
          } else {
            reject(new Error('Leads not found'))
          }
        }, 1000)
      })
      dispatch(setLeadsList(data))
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
  (files: TInit['filesForImport']): TAsyncAction =>
  async (dispatch, _store) => {
    const importFilesAsync = async (files: TInit['filesForImport'], index = 0) => {
      if (index >= files.length) {
        // Base case: if all files have been processed, end the recursion
        return
      }
      const { filesForImport } = _store().leads

      const file = files[index]
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
        const data = await new Promise<TInit['filesForImport'][0]>((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.3)
              reject('Error. For more detailed error connect the backend part')
            else resolve(file)
          }, 1000)
        })

        dispatch(
          updateImportFiles(
            filesForImport.map((item) => {
              if (item.duplicate) return item
              if (item.id === data.id) return { ...data, imported: true }
              return item
            }),
          ),
        )
      } catch (e) {
        dispatch(
          updateImportFiles(
            filesForImport.map((item) => {
              if (item.duplicate) return item
              if (item.id === file.id) return { ...file, error: e as string }
              return item
            }),
          ),
        )
        handleRestError({ e, dispatch })
      } finally {
        // Recursive call to process the next file
        await importFilesAsync(files, index + 1)
      }
    }
    try {
      await importFilesAsync(files)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }
