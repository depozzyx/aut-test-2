import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { FormikHelpers } from 'formik'
import { TAsyncAction, TSelector } from '@/store'
import { TAgent, TUpdateAgentReq } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { notificationActions } from '@/features/common/notifications/store'
import {
  asyncGetAgentsList,
  selectAgentsList,
  selectSelectedId,
} from '@/features/agents/store/agents'
import { modalsActions } from '@/features/common/modals/store'
import { ORDER_BY } from '@/constants/orderBy'

export type TInit = {
  isLoading: boolean
  updatedAgentData: null | TAgent
}

const init: TInit = {
  isLoading: false,
  updatedAgentData: null,
}

const editAgent = createSlice({
  name: 'editAgent',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setUpdatedAgentData(state, action: PayloadAction<TInit['updatedAgentData']>) {
      state.updatedAgentData = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, setUpdatedAgentData, reset } = editAgent.actions

export const selectUpdateAgent: TSelector<TInit> = (state) => state.editAgent

export const selectUpdateAgentIsLoading = createSelector(
  selectUpdateAgent,
  ({ isLoading }) => isLoading,
)

export const selectInitFormData = createSelector(
  [selectSelectedId, selectAgentsList],
  (selectedId, agentsList) => {
    if (!selectedId || !agentsList) return null

    const currentAgent = agentsList.find((agent) => agent.id === selectedId)

    return {
      username: currentAgent?.username || '',
      email: currentAgent?.email || '',
    }
  },
)

export default editAgent.reducer

export const asyncUpdateAgent =
  ({
    formData,
    formik,
  }: {
    formData: Omit<TUpdateAgentReq, 'id'>
    formik?: FormikHelpers<Omit<TUpdateAgentReq, 'id'>>
  }): TAsyncAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true))
      const requestData = {
        id: getState().agents.selectedId as number,
        ...formData,
      }
      const { data } = await apiAgents.updateAgent(requestData)
      dispatch(setUpdatedAgentData(data.data))
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:agent.update-success',
          status: 'success',
          values: {},
        }),
      )

      dispatch(
        asyncGetAgentsList({
          page: 1,
          limit: 7,
          orderBy: ORDER_BY.DESC,
        }),
      )
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      formik?.resetForm()
      dispatch(modalsActions.resetModalsState())
      dispatch(setIsLoading(false))
    }
  }
