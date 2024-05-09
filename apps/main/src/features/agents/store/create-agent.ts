import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import { TCreateAgentReq, TAgent } from '@/api-rest/agents/types'
import { handleRestError } from '@/features/common/error'
import { apiAgents } from '@/api-rest/agents'
import { FormikHelpers } from 'formik'
import { TFormPropsAsync } from '@peiko/types/formik'
import { notificationActions } from '@/features/common/notifications/store'

export type TInit = {
  isLoading: boolean
  createdAgentData: null | TAgent
}

const init: TInit = {
  isLoading: false,
  createdAgentData: null,
}

const createAgent = createSlice({
  name: 'createAgent',
  initialState: init,
  reducers: {
    setIsLoading(state, action: PayloadAction<TInit['isLoading']>) {
      state.isLoading = action.payload
    },
    setCreatedAgentData(state, action: PayloadAction<TInit['createdAgentData']>) {
      state.createdAgentData = action.payload
    },
    reset: () => init,
  },
})

export const { setIsLoading, reset, setCreatedAgentData } = createAgent.actions

export const selectCreateAgents: TSelector<TInit> = (state) => state.createAgent

export const selectCreateAgentsIsLoading = createSelector(
  selectCreateAgents,
  ({ isLoading }) => isLoading,
)

export default createAgent.reducer

export const asyncCreateAgent =
  ({
    formData,
    formik,
  }: TFormPropsAsync<TCreateAgentReq> & {
    formik?: FormikHelpers<TCreateAgentReq>
  }): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true))
      const { data } = await apiAgents.createAgent(formData)
      dispatch(setCreatedAgentData(data.data))
      const agentName = data.data.username
      dispatch(
        notificationActions.setNotification({
          key: 'notifications:agent.create-success',
          status: 'success',
          values: { agentName },
        }),
      )
      formik?.resetForm()
    } catch (e) {
      handleRestError({ e, dispatch, formik })
    } finally {
      dispatch(setIsLoading(false))
    }
  }
