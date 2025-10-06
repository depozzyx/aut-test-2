import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import errorReducer from '@/features/common/error/store'
import userReducer from '@/features/common/user/store'
import agentStatusReducer from '@/features/common/agentStatus/store'
import signInReducer from '@/features/auth/store/sign-in'
import forgotPasswordReducer from '@/features/auth/store/forgot-password'
import resetPasswordReducer from '@/features/auth/store/reset-password'
import notificationsReducer from '@/features/common/notifications/store'
import modalsReducer from '@/features/common/modals/store'
import campaignsReducer from '@/features/campaigns/store/campaigns'
import createCampaignReducer from '@/features/campaigns/store/create-campaign'
import leadsReducer from '@/features/leads/store/leads'
import activityLogReducer from '@/features/activityLog/store/activity-log'
import editCampaignReducer from '@/features/campaigns/store/edit-campaign'
import leadListReducer from '@/features/leads/store/lead-list'
import agentAnalyticsReducer from '@/features/agents/store/agent-analytics'
import agentReducer from '@/features/agents/store/agents'
import campaignAnalyticsReducer from '@/features/campaigns/store/campaign-analytics'
import apiKeyReducer from '@/features/settings/store/api-key'
import campaignLogReducer from '@/features/activityLog/store/campaign-log'
import usersReducer from '@/features/users/store/users'
import createUserReducer from '@/features/users/store/create-user'
import editUserReducer from '@/features/users/store/edit-user'
import callsReducer from '@/features/calls/store/calls'
import reportsReducer from '@/features/reports/store/reports'

const store = configureStore({
  reducer: {
    error: errorReducer,
    user: userReducer,
    agentStatus: agentStatusReducer,
    signIn: signInReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    notifications: notificationsReducer,
    modals: modalsReducer,
    agentAnalytics: agentAnalyticsReducer,
    agents: agentReducer,
    campaigns: campaignsReducer,
    editCampaign: editCampaignReducer,
    createCampaign: createCampaignReducer,
    campaignAnalytics: campaignAnalyticsReducer,
    campaignLog: campaignLogReducer,
    leads: leadsReducer,
    leadList: leadListReducer,
    activityLog: activityLogReducer,
    apiKey: apiKeyReducer,
    users: usersReducer,
    createUser: createUserReducer,
    editUser: editUserReducer,
    calls: callsReducer,
    reports: reportsReducer,
  },
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
