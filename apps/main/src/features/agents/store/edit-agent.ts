import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TAgent, TUpdateAgentReq } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { FormikHelpers } from 'formik'
import { notificationActions } from '@/features/common/notifications/store'
import {
  asyncGetAgentsList,
  selectAgentsList,
  selectSelectedId,
} from '@/features/agents/store/agents'

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

export const selectCreateAgents: TSelector<TInit> = (state) => state.editAgent

export const selectUpdateAgentsIsLoading = createSelector(
  selectCreateAgents,
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
      const agentName = data.data.username
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:agent.update-success',
          status: 'success',
          values: { agentName },
        }),
      )

      asyncGetAgentsList({
        page: 1,
        limit: 10,
        orderBy: 'ASC',
      })
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
