import {
  TGeneratedCallTime,
  TGeneratedCallFrequency,
} from '@/features/campaigns/constants'
import { TLeadList } from '@/features/campaigns/hooks/use-getCampaignById'

export type TCampaignTableType = 'active' | 'list'

export type TCampaignStatus = 'active' | 'pause' | 'complete'

export type StatisticsTypeResponse = {
  oncall_agents: number
  online_agents: number
  ringing_clients: number
  waiting_clients: number
}

export type TActiveCampaign = {
  id: 1
  name: string
  createdAt: string
  status: TCampaignStatus
  intensity: TGeneratedCallFrequency
  intensityPerAgent: TGeneratedCallFrequency
  preferredCallTime: TGeneratedCallTime
  statistic?: StatisticsTypeResponse
}

export type TCampaign = {
  id: number
  name: string
  createdAt: string
  agentCount: number
  leadCount: number
  leadLists: TLeadList[]
  assignedAgents: []
  intensity: TGeneratedCallFrequency
  intensityPerAgent: TGeneratedCallFrequency
  status: TCampaignStatus
  preferredCallTime: TGeneratedCallTime
}

export type TFilterType =
  | 'searchTerm'
  | 'filterCampaignName'
  | 'status'
  | 'filterDate'
  | 'all'
