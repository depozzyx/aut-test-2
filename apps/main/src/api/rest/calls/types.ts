import { TOrder } from '../../../types/entities/order'
import { TPagination } from '../../../types/entities/pagination'
import { TAgent } from '../agents/types'
import { TLeadList } from '../campaigns/types'
import { TLeadData } from '../leads/types'

export type TFeedbackReq = {
  status: string
  requestId: string
}

export type TMakeCallReq = {
  phone: string
}

export type TMakeEchoTestReq = {
  exten: string
}

export type _PbxHealthResponse = {
  isReady: boolean
}

export type TCallFilters = {
  leadListId?: number
  disposition?: string
  agentId?: number
  dateFrom?: number
  dateTo?: number
  campaignId?: number
  status?: string
  phone?: string
  country?: string
}

export enum CallOrderBy {
  createdAt = 'createdAt',
  duration = 'duration',
  user = 'user',
  talkTime = 'talkTime',
  status = 'status',
  campaign = 'campaign',
  leadList = 'leadList',
}

export type TCDRListReq = {
  orderBy?: CallOrderBy
  order?: TOrder
} & Partial<Pick<TPagination, 'page' | 'limit'>> &
  TCallFilters

export type TCDRList = {
  id: number
  requestId: string
  duration: number
  talkTime: number
  onCallTime: number
  createdAt: string
  disposition: string
  status: string
  lead: TLeadData
  leadList: TLeadList
  phone: string
  campaign: string
  user?: TAgent
}

export interface TPbxHealthCheckResponse {
  statusCode: number
  data: {
    API_STATUS: {
      isConnected: boolean
      status: string
      details: {
        baseUrl: string
        responseTime: string
        apiStatus: {
          isAvailable: boolean
          endpoints: {
            'agent-status': {
              status: string
              responseTime: string
            }
          }
        }
      }
    }
    WS_STATUS: {
      isConnected: boolean
      readyState: string
      stats: {
        lastPing: string
        lastPong: string
        lastEvent: string
        totalEvents: number
        connectionDuration: string
        lastReconnect: string
        reconnectAttempts: number
      }
    }
    OVERALL_STATUS: {
      status: string
      message: string
      details: string[]
    }
    isReady: boolean
  }
}
