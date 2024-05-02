import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import errorReducer from '@/features/common/error/store'
import userReducer from '@/features/common/user/store'
import signInReducer from '@/features/auth/store/sign-in'
import forgotPasswordReducer from '@/features/auth/store/forgot-password'
import resetPasswordReducer from '@/features/auth/store/reset-password'
import notificationsReducer from '@/features/common/notifications/store'
import modalsReducer from '@/features/common/modals/store'
import campaignsReducer from '@/features/campaigns/store/campaigns'
import createCampaignReducer from '@/features/campaigns/store/create-campaign'
import leadsReducer from '@/features/leads/store/leads'
import editCampaignReducer from '@/features/campaigns/store/edit-campaign'
import leadListReducer from '@/features/leads/store/lead-list'
import agentsReducer from '../features/agents/store/agents'

const store = configureStore({
  reducer: {
    error: errorReducer,
    user: userReducer,
    signIn: signInReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    notifications: notificationsReducer,
    modals: modalsReducer,
    agents: agentsReducer,
    campaigns: campaignsReducer,
    createCampaign: createCampaignReducer,
    editCampaign: editCampaignReducer,
    leads: leadsReducer,
    leadList: leadListReducer,
  },
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
