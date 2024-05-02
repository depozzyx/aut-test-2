import {
  TGeneratedCallTime,
  TGeneratedCallFrequency,
} from '@/features/campaigns/constants'

export type TCampaignTableType = 'active' | 'list'

export type TCampaignStatus = 'active' | 'pause' | 'complete'

export type TActiveCampaign = {
  id: 1
  name: string
  createdAt: string
  callAnswerRate: number
  conversionRate: number
  status: TCampaignStatus
  intensity: TGeneratedCallFrequency
  intensityPerAgent: TGeneratedCallFrequency
  preferredCallTime: TGeneratedCallTime
}

export type TCampaign = {
  id: number
  name: string
  createdAt: string
  agentCount: number
  leadCount: number
  leadLists: []
  assignedAgents: []
  intensity: TGeneratedCallFrequency
  intensityPerAgent: TGeneratedCallFrequency
  status: TCampaignStatus
  preferredCallTime: TGeneratedCallTime
}
