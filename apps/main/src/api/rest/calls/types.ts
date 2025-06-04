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
