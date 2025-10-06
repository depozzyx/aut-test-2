export enum CampaignStatisticFields {
  status = 'status',
  campaign = 'campaign',
  leadList = 'leadList',
  agent = 'agent',
  day = 'day',
  month = 'month',
  disposition = 'disposition',
}

export enum CampaignStatisticOrderBy {
  groups = 'groups',
  callsCount = 'callsCount',
  leadsCount = 'leadsCount',
  duration = 'duration',
  talkTime = 'talkTime',
  onCallTime = 'onCallTime',
}

export type CampaignStatisticFilters = {
  leadListId?: number
  agentId?: number
  dateFrom?: number
  dateTo?: number
  country?: string
  disposition?: string
  status?: string
  campaignId?: number
}

export type CampaignStatisticReq = {
  filter?: CampaignStatisticFilters
  orderBy?: CampaignStatisticOrderBy
  order?: 'ASC' | 'DESC'
  groupBy?: CampaignStatisticFields[]
  type: 'calls' | 'leads'
}
export type ReportGroup = {
  field?: CampaignStatisticFields
  name: string
  id?: number
}

export type CampaignStatisticDetail = {
  group: ReportGroup
  children?: TCampaignStatisticRow[]
}

export type CampaignStatisticMetrics = {
  callsCount: number
  leadsCount: number
  duration: number
  talkTime: number
  onCallTime: number
  avgOnCallTime: number
  callsPerHour: number
  avgTalkTime: number
  callsPerTalkHour: number
}

export type TCampaignStatisticRow = CampaignStatisticDetail & CampaignStatisticMetrics

export type CampaignStatistic = {
  rows: TCampaignStatisticRow[]
  total: CampaignStatisticMetrics
}

export type CampaignStatisticRes = {
  data: CampaignStatistic
  statusCode: number
  message: string
}
