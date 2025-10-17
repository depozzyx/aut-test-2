import { Flex } from '@/components/Flex'
import { Card } from '@peiko/components/Card'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState, useCallback, useRef } from 'react'
import { useMount, useUnmount } from 'react-use'
import dynamic from 'next/dynamic'
import JsSIP from 'jssip'
import { UAConfiguration } from 'jssip/lib/UA'
import { decrypt } from '@peiko/utils/crypto-js'
import { API_SECRET_KEY, ICE_SERVERS } from '@/constants/config'

import { CallIcon } from '@/icons/CallIcon'
import { useRedux } from '@/hooks/use-redux'
import { apiCalls } from '@/api-rest/calls'
import { useAuth } from '@/features/common/user'
import {
  selectSelectedCampaignId,
  setSelectedCampaignId,
} from '@/features/agents/store/agents'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { apiCampaigns } from '@/api-rest/campaigns'
import { apiAgents } from '@/api-rest/agents'
import { palette } from '@peiko/styles/palette'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { getCountryName } from '@/features/campaigns/utils/getCountryByCode'
import { useStore } from 'react-redux'
import { TDispatch } from 'store'
import {
  asyncGetAgentAssignedCampaigns,
  selectAgentAssignedCampaigns,
  setAgentAssignedCampaigns,
} from '@/features/campaigns/store/campaigns'
import { formatDuration } from '@/utils/date-to-string'
import { CardTile } from '@/features/settings/components/CardTile'
import { TAgentDashboard } from '@/api-rest/agents/types'
import { isString } from 'formik'
import { ButtonWithTooltip } from '@/features/campaigns/containers/tables/CampaignListTable/ButtonWithTooltip'
import { notificationActions } from '@/features/common/notifications/store'
import { useCounter } from '@/features/leads/hooks/useCounter'
import { ERoles } from '@/constants/profile'
import { CallButton } from './components/CallButton/CallButton'
import { CallWindow } from './components/CallWindow'
import { useSIPService } from './hooks/useSIPService'
import { agentActions, agentStatusSelector } from '../common/agentStatus/store'
import { errorActions, handleRestError } from '../common/error'
import { socket } from '../../api/socket/Socket'
import { campaignSocket } from '../../api/socket/campaign'
import { HealthCheckStatusModal } from './components/HealthCheckStatusModal'
import { TCampaignStatus } from '../campaigns/types'
import { formatDelayedUntil } from '../campaigns/utils/formatCreateAt'

const SelectAgentCampaignModal = dynamic(
  () =>
    import('./containers/modals/SelectAgentCampaignModal').then(
      (mod) => mod.SelectAgentCampaignModal,
    ),
  {
    ssr: false,
  },
)

const gridRepeatCount = (length: number) => {
  if (length <= 9) return 3
  if (length > 9) return 4
  if (length > 12) return 5
}

const SUBSCRIBE_CAMPAIGN_STATUS = 'Subscribe campaign status'

const getActiveCampaigns = async (dispatch: TDispatch) => {
  const response = await apiCampaigns.getAgentAssignedActiveCampaigns()
  const campaigns = response?.data?.data || []
  dispatch(setAgentAssignedCampaigns(campaigns))
  return campaigns
}

const getCurrentAgentDashboard = async (
  dispatch: TDispatch,
  setAgentDashboard: React.Dispatch<React.SetStateAction<TAgentDashboard | undefined>>,
) => {
  try {
    const response = await apiAgents.getAgentDashboard()
    setAgentDashboard(response?.data?.data)
  } catch (e) {
    handleRestError({ e, dispatch })
  }
}
const checkStatus = async (dispatch: TDispatch) => {
  await getActiveCampaigns(dispatch)
  const { data } = await apiAgents.getAgentStatus()
  dispatch(agentActions.setPBXStatus(data.data))
  if (data.data.status !== 'offline') {
    dispatch(agentActions.setStatusAsync('finish'))
    dispatch(setSelectedCampaignId(null))
  }
}

export type THealthCheckStep = 'pending' | 'loading' | 'success' | 'error'
export type THealthStatus = {
  isHealthy: boolean
  api: {
    status: THealthCheckStep
    progress: number
    error?: string
  }
  websocket: {
    status: THealthCheckStep
    progress: number
    error?: string
  }
  sip: {
    status: THealthCheckStep
    progress: number
    error?: string
  }
}

export const Calls: FC = () => {
  const FEEDBACK_TIMEOUT = 60000 // 60 seconds
  const REFETCH_AGENT_DASHBOARD_TIMEOUT = 5000 // 5 seconds

  const { t } = useTranslation('calls')

  const { dispatch, select } = useRedux()
  const store = useStore()
  const { pbxStatus, checkCampaignId, sipCanConnect, hasCurrentRTCSession } =
    select(agentStatusSelector)
  const [callDuration, setCallDuration] = useState(0)
  const [hasCampaignSubscription, setHasCampaignSubscription] = useState(false)

  const {
    connect,
    keepAlive,
    disconnect,
    endCall,
    ua,
    lead,
    endedCall,
    setEndedCall,
    setLead,
    onSubscribeCalls,
    onUnsubscribeCalls,
  } = useSIPService()

  const { user, pbxAuth, userFetching } = useAuth()
  // const { user } = useAuth()
  const { modalState, setModal } = useModals()
  const [campaignCompleted, setCampaignCompleted] = useState(false)

  const selectedCampaignId = select(selectSelectedCampaignId)
  const leadStatuses = select(selectLeadStatuses)
  const agentAssignedCampaigns = select(selectAgentAssignedCampaigns)

  const openModal = async () => {
    dispatch(asyncGetAgentAssignedCampaigns())
    setModal({ modalName: MODAL_NAMES.SELECT_AGENT_CAMPAIGN, isOpen: true })
  }

  const onUnsubscribeCampaignStatus = () => {
    setHasCampaignSubscription(false)
    socket.unsubscribe(SUBSCRIBE_CAMPAIGN_STATUS)
  }

  const checkIfAllCampaignsCompleted = async () => {
    const campaignsData = await getActiveCampaigns(dispatch)
    if (!campaignsData.length) {
      setCampaignCompleted(true)
    }
  }

  const onCompleteCampaign = (status: TCampaignStatus) => {
    // eslint-disable-next-line no-console
    console.info('run oncomplete callback => set agent status [finish]')
    dispatch(
      notificationActions.setNotification({
        key: `notifications:agent.campaign-${status}`,
        status: 'info',
        values: {},
      }),
    )
    if (pbxStatus.status !== 'offline') {
      dispatch(agentActions.setStatusAsync('finish'))
    }
    dispatch(agentActions.setSipCanConnect(false))
    disconnect()
    checkIfAllCampaignsCompleted()
    dispatch(setSelectedCampaignId(null))
  }

  const [completed, setCompleted] = useState(false)
  const completedRef = useRef(completed)
  useEffect(() => {
    completedRef.current = completed
  }, [completed])
  const leadRef = useRef(lead)
  useEffect(() => {
    leadRef.current = lead
  }, [lead])

  const onSubscribeCampaignStatus = (campaignId: string) => {
    if (hasCampaignSubscription) {
      onUnsubscribeCampaignStatus()
    }
    setHasCampaignSubscription(true)
    campaignSocket.campaignStatusUpdate(
      {
        id: SUBSCRIBE_CAMPAIGN_STATUS,
        callback: (e) => {
          if (e.status === 'complete' || e.status === 'pause') {
            setTimeout(() => {
              const { status, reason } = store.getState().agentStatus.pbxStatus
              // eslint-disable-next-line no-console
              console.info(`Received completed event, current Agent Status: ${status}`)

              if (status !== 'offline') {
                // Check if agent is on call or on feedback of last call
                const isInCall = status === 'oncall'
                const isInFeedback = status === 'pause' && reason === 'feedback'

                if (isInCall || isInFeedback) {
                  console.info('Agent is in call or feedback, will complete after')
                  setCompleted(true)
                } else {
                  console.info('set oncomplete callback')
                  onCompleteCampaign(e.status)
                }
              }
              if (e.status === 'complete') onUnsubscribeCampaignStatus()
            }, 2000)
          } else if (e.status === 'active') {
            setCompleted(false)
            if (e.nearestTime && formatDelayedUntil(e.nearestTime)) {
              dispatch(
                notificationActions.setNotification({
                  key: `notifications:agent.campaign-${e.status}`,
                  status: 'info',
                  values: { nearestTime: formatDelayedUntil(e.nearestTime) },
                }),
              )
            }
          }
        },
      },
      campaignId,
    )
  }

  // // connect to sip
  useEffect(() => {
    if (sipCanConnect && !hasCurrentRTCSession && !ua?.isConnected()) {
      // eslint-disable-next-line no-console
      console.info(`CONNECTING TO SIP... [${pbxStatus.status}]`)
      connect()
      onSubscribeCalls()
      keepAlive()
      // setTimeout(() => {
      //   // eslint-disable-next-line no-console
      //   console.info('TIMER')
      //   dispatch(agentActions.setStatusAsync('start'))
      // }, 500)
    }
    if (!sipCanConnect && ua?.isConnected()) {
      console.info(`DISCONNECTING FROM SIP... [${pbxStatus.status}]`)
      disconnect()
    }
  }, [ua, hasCurrentRTCSession, sipCanConnect])

  /**
   * PBX AND SIP SYSTEM HEALTH CHECK
   * */
  const apiCounter = useCounter(99, 1500)
  const wsCounter = useCounter(99, 1500)
  const sipCounter = useCounter(99, 1500)
  const [healthStatus, setHealthStatus] = useState<THealthStatus>({
    isHealthy: false,
    api: { status: 'pending', progress: 0 },
    websocket: { status: 'pending', progress: 0 },
    sip: { status: 'pending', progress: 0 },
  })
  const handleCloseHealthCheck = async () => {
    setModal({ modalName: MODAL_NAMES.HEALTH_CHECK_STATUS, isOpen: false })
    setHealthStatus({
      isHealthy: false,
      api: { status: 'pending', progress: 0 },
      websocket: { status: 'pending', progress: 0 },
      sip: { status: 'pending', progress: 0 },
    })
    if (healthStatus.isHealthy) {
      await openModal()
    }
  }
  const testSIPConnection = useCallback(async () => {
    if (userFetching || !pbxAuth?.username) return 'SIP not registered'

    return new Promise<string>((resolve) => {
      // eslint-disable-next-line no-console
      console.info(`Starting SIP-[${pbxAuth?.username}] test connection ...`)

      const sipOptions = {
        pcConfig: {
          rtcpMuxPolicy: 'negotiate' as 'require',
          iceServers: ICE_SERVERS,
          iceTransportPolicy: 'relay',
        },
        mediaConstraints: {
          audio: true,
          video: false,
        },
        rtcOfferConstraints: {
          offerToReceiveAudio: true,
        },
      }

      const configuration: UAConfiguration = {
        uri: `sip:${pbxAuth.username}@${pbxAuth.domain}`,
        password: decrypt(pbxAuth.password, API_SECRET_KEY),
        sockets: new JsSIP.WebSocketInterface(`wss://${pbxAuth.domain}:7777/ws`),
        register: true,
        ...sipOptions,
        // connection_recovery_min_interval: 1,
        // connection_recovery_max_interval: 1,
      }

      const testUA = new JsSIP.UA(configuration)

      let isResolved = false
      let testSession: any = null
      const timeout = setTimeout(() => {
        if (testUA && !isResolved) {
          console.error('SIP test connection timeout')
          if (testSession) testSession.terminate()
          testUA.terminateSessions()
          testUA.unregister()
          testUA.stop()
          resolve('Connection timeout')
        }
      }, 10000)

      testUA.on('connected', () => {
        console.info('SIP test websocket connected')
      })
      testUA.on('disconnected', () => {
        console.info('SIP test websocket disconnected')
      })
      testUA.on('registered', () => {
        console.info('SIP test registration successful')
        testSession = testUA?.call('*43', {
          mediaConstraints: { audio: true, video: false },
        })
        testSession.on('progress', () => {
          console.info('SIP test call is in progress...')
        })
        testSession.on('confirmed', () => {
          console.info(`sip test session status= ${testSession?.status}`)
          if (testSession?.terminate && testSession?.status !== 8) {
            setTimeout(() => {
              if (testSession?.status !== 8) testSession.terminate()
            }, 1000)
          }
        })
        testSession.on('ended', () => {
          console.info('SIP test call ended')
          if (testUA && !isResolved) {
            isResolved = true
            clearTimeout(timeout)
            setTimeout(() => {
              testUA?.terminateSessions()
              testUA?.unregister()
              testUA?.stop()
              resolve('')
            }, 1000)
          }
        })
        testSession.on('failed', (e: any) => {
          console.error('SIP test call failed', e)
          if (testUA && !isResolved) {
            isResolved = true
            clearTimeout(timeout)
            setTimeout(() => {
              testUA?.terminateSessions()
              testUA?.unregister()
              testUA?.stop()
              resolve(e?.cause ?? 'Unknown reason')
            }, 1000)
          }
        })
      })
      testUA.on('registrationFailed', (e) => {
        console.error('SIP test registration failed:', e)
        if (testUA && !isResolved) {
          isResolved = true
          clearTimeout(timeout)
          setTimeout(() => {
            testUA?.terminateSessions()
            testUA?.unregister()
            testUA?.stop()
            resolve('Registration failed')
          }, 1000)
        }
      })

      testUA?.start()
    })
  }, [pbxAuth])

  const checkSystemHealth = useCallback(async () => {
    setHealthStatus((prev) => ({
      ...prev,
      api: { status: 'loading', progress: 0 },
      websocket: { ...prev.websocket, status: 'pending', progress: 0 },
      sip: { ...prev.sip, status: 'pending', progress: 0 },
      isHealthy: false,
    }))
    apiCounter.resetCount()
    apiCounter.startCounter()
    let apiError = ''
    let apiOk = false
    let healthData: any = null
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1300))
    try {
      const response = await apiCalls.checkPbxApiHealth('api')
      healthData = response.data.data
      if (!healthData.API_STATUS.isConnected) {
        apiError =
          healthData.API_STATUS.error ||
          healthData.API_STATUS.details?.lastError ||
          healthData.API_STATUS.details?.apiStatus?.endpoints?.['agent-status']?.error ||
          healthData.API_STATUS.status ||
          'API error'
      } else {
        apiOk = true
      }
    } catch (e) {
      apiError = 'API error'
    }
    apiCounter.stopCounter()
    setHealthStatus((prev) => ({
      ...prev,
      api: {
        status: apiOk ? 'success' : 'error',
        progress: 100,
        error: apiOk ? undefined : apiError,
      },
      websocket: { ...prev.websocket, status: 'pending', progress: 0 },
      sip: { ...prev.sip, status: 'pending', progress: 0 },
      isHealthy: false,
    }))

    if (!apiOk) {
      setHealthStatus((prev) => ({
        ...prev,
        websocket: { status: 'pending', progress: 0 },
        sip: { status: 'pending', progress: 0 },
        isHealthy: false,
      }))
      setModal({ modalName: MODAL_NAMES.HEALTH_CHECK_STATUS, isOpen: true })
      return
    }
    setHealthStatus((prev) => ({
      ...prev,
      websocket: { status: 'loading', progress: 0 },
    }))
    wsCounter.resetCount()
    wsCounter.startCounter()
    let wsError = ''
    let wsOk = false
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1300))
    try {
      const wsResponse = await apiCalls.checkPbxApiHealth('ws')
      const wsData = wsResponse.data.data
      if (!wsData.WS_STATUS.isConnected) {
        wsError =
          wsData.WS_STATUS.readyState ||
          wsData.WS_STATUS.stats?.lastEvent ||
          wsData.WS_STATUS.stats?.lastReconnect ||
          'WebSocket error'
      } else {
        wsOk = true
      }
    } catch (e) {
      wsError = 'WebSocket error'
    }
    wsCounter.stopCounter()
    setHealthStatus((prev) => ({
      ...prev,
      websocket: {
        status: wsOk ? 'success' : 'error',
        progress: 100,
        error: wsOk ? undefined : wsError,
      },
      sip: { ...prev.sip, status: 'pending', progress: 0 },
      isHealthy: false,
    }))

    if (!wsOk) {
      setHealthStatus((prev) => ({
        ...prev,
        sip: { status: 'pending', progress: 0 },
        isHealthy: false,
      }))
      setModal({ modalName: MODAL_NAMES.HEALTH_CHECK_STATUS, isOpen: true })
      return
    }
    setHealthStatus((prev) => ({
      ...prev,
      sip: { status: 'loading', progress: 0 },
    }))
    sipCounter.resetCount()
    sipCounter.startCounter()
    let sipError = ''
    let sipOk = false
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1300))
    try {
      const sipResult = await testSIPConnection()
      if (sipResult) {
        sipError = `SIP registration test failed. ${sipResult}`
      } else {
        sipOk = true
      }
    } catch (e) {
      sipError = 'SIP error'
    }
    sipCounter.stopCounter()

    if (ua) {
      ua.terminateSessions()
      ua.unregister()
      ua.stop()
    }
    disconnect()

    setHealthStatus((prev) => ({
      ...prev,
      sip: {
        status: sipOk ? 'success' : 'error',
        progress: 100,
        error: sipOk ? undefined : sipError,
      },
      isHealthy: apiOk && wsOk && sipOk,
    }))
    setModal({ modalName: MODAL_NAMES.HEALTH_CHECK_STATUS, isOpen: true })
  }, [apiCounter, wsCounter, sipCounter, setModal, testSIPConnection, disconnect])

  useEffect(() => {
    if (healthStatus.api.status === 'loading' && healthStatus.api.progress < 99) {
      setHealthStatus((prev) =>
        prev.api.status === 'loading' && prev.api.progress < 99
          ? { ...prev, api: { ...prev.api, progress: apiCounter.count } }
          : prev,
      )
    }
  }, [apiCounter.count])
  useEffect(() => {
    if (
      healthStatus.websocket.status === 'loading' &&
      healthStatus.websocket.progress < 99
    ) {
      setHealthStatus((prev) =>
        prev.websocket.status === 'loading' && prev.websocket.progress < 99
          ? { ...prev, websocket: { ...prev.websocket, progress: wsCounter.count } }
          : prev,
      )
    }
  }, [wsCounter.count])
  useEffect(() => {
    if (healthStatus.sip.status === 'loading' && healthStatus.sip.progress < 99) {
      setHealthStatus((prev) =>
        prev.sip.status === 'loading' && prev.sip.progress < 99
          ? { ...prev, sip: { ...prev.sip, progress: sipCounter.count } }
          : prev,
      )
    }
  }, [sipCounter.count])

  useMount(async () => {
    // eslint-disable-next-line no-console
    console.info('on mount isConnected: ', ua?.isConnected())
    dispatch(getLeadStatuses())
    await checkStatus(dispatch)
  })

  // Run health check only once when auth and pbxAuth are ready to avoid racing before pbxAuth is set
  const healthCheckStartedRef = useRef(false)
  useEffect(() => {
    if (healthCheckStartedRef.current) return
    const isAgent = user?.role === ERoles.AGENT
    if (!userFetching && isAgent && pbxAuth?.username) {
      healthCheckStartedRef.current = true
      checkSystemHealth()
    }
  }, [userFetching, user?.role, pbxAuth?.username, checkSystemHealth])

  useUnmount(() => {
    // eslint-disable-next-line no-console
    console.info('disconnect on unmount')
    // if (['offline', 'finish', 'pause'].includes(pbxStatus.status)) {
    //   disconnect()
    // }
    onUnsubscribeCampaignStatus()
    onUnsubscribeCalls()
    dispatch(agentActions.setSipCanConnect(false))
    if (selectedCampaignId) {
      dispatch(setSelectedCampaignId(null))
    }
  })

  useEffect(() => {
    if (user?.role === ERoles.AGENT) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const { pbxStatus } = store.getState().agentStatus
        const isInFeedback =
          pbxStatus.status === 'pause' && pbxStatus.reason === 'feedback'

        if (isInFeedback && leadRef.current) {
          apiCalls.feedback({
            status: 'NAF',
            requestId: leadRef.current.requestId,
          })
        }
        if (pbxStatus.status !== 'offline') {
          apiAgents.changeWorkStatus({
            workStatus: 'finish',
          })
        }
        event.preventDefault()
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  const [onSelectedCampaign, setOnSelectedCampaign] = useState(true)

  const selectCampaign = async (): Promise<number | null> => {
    const campaignsData = await getActiveCampaigns(dispatch)
    if (!campaignsData.length) {
      return null
    }
    if (campaignsData.length === 1) {
      const campaignId = campaignsData[0].id
      if (campaignId) {
        dispatch(setSelectedCampaignId(String(campaignId)))
        onSubscribeCampaignStatus(String(campaignId))
        return campaignId
      }
    } else {
      openModal()
    }
    return null
  }

  // set agent working campaign
  const setCampaignId = async (createCallback?: boolean): Promise<number | null> => {
    if (user?.role === 'agent' && !selectedCampaignId) {
      if (createCallback) {
        setOnSelectedCampaign(true)
      }
      return selectCampaign()
    }
    return null
  }

  useEffect(() => {
    if (checkCampaignId) {
      dispatch(agentActions.setCheckCampaignId(false))
      setCampaignId(true).then((id) => {
        if (id) {
          // eslint-disable-next-line no-console
          console.info('checkCampaignId with callback to -> start ', id)
          if (pbxStatus.status !== 'online') {
            dispatch(agentActions.setSipCanConnect(true))
            // eslint-disable-next-line no-console
            console.info('callback to -> start')
            dispatch(agentActions.setStatusAsync('start'))
          }
          onSubscribeCampaignStatus(String(id))
        }
      })
    }
  }, [checkCampaignId])

  const resetAllData = async () => {
    setCallDuration(0)
    setEndedCall(false)
    setLead(null)
  }

  const hangupAsync = async () => {
    try {
      await apiAgents.hangup()
    } catch (e) {
      resetAllData()
      await checkStatus(dispatch)
      dispatch(
        notificationActions.setNotification({
          key: `notifications:agent.connection-restored`,
          status: 'info',
          values: {},
        }),
      )
    }
  }

  const handleEndCall = async () => {
    endCall()
    await hangupAsync()
    setEndedCall(true)
  }

  const onCallFeedback = async (status: string) => {
    try {
      if (!lead) {
        console.error('Lead info for feedback not provided close feedback and unpause')
        dispatch(agentActions.setStatusAsync('unpause'))
        return
      }
      const holdTimeSec = lead?.campaign?.holdTime
      await apiCalls.feedback({
        status,
        requestId: lead.requestId,
      })
      await resetAllData()
      if (holdTimeSec) {
        console.info(
          `[SET HOLD for ${holdTimeSec} sec]! -> and unpause after`,
          new Date(),
        )
        dispatch(agentActions.setStatusAsync('pause', 'hold'))
        // un hold after timeout
        setTimeout(() => {
          console.info(
            `[CAMPAIGN HOLD TIMER set for ${holdTimeSec} seconds]! -> unpause`,
            new Date(),
          )
          const { status, reason } = store.getState().agentStatus.pbxStatus
          if (completedRef.current) {
            onCompleteCampaign(status)
            setCompleted(false)
          } else if (reason !== 'manual' && status === 'pause') {
            console.info(`campaign is not completed yet ${status} => unpause`)
            dispatch(agentActions.setStatusAsync('unpause'))
          }
        }, holdTimeSec * 1000)
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  // reset all on call ends
  useEffect(() => {
    if (['online'].includes(pbxStatus.status) && endedCall) {
      resetAllData()
    }
  }, [pbxStatus.status])

  const [agentDashboard, setAgentDashboard] = useState<TAgentDashboard>()

  // set campaign id on selected
  useEffect(() => {
    setCampaignId()
  }, [selectedCampaignId])

  const showModal =
    modalState?.modalName === MODAL_NAMES.SELECT_AGENT_CAMPAIGN &&
    modalState.isOpen &&
    !['oncall', 'ringing', 'pause'].includes(pbxStatus.status)

  const handleChangeCampaign = async () => {
    if (pbxStatus.status !== 'offline') {
      dispatch(
        errorActions.showGlobalError(
          "You can't change the campaign right now. Please switch it to offline mode first.",
        ),
      )
    } else {
      await selectCampaign()
    }
  }

  // get agent dashboard data
  useEffect(() => {
    getCurrentAgentDashboard(dispatch, setAgentDashboard)
  }, [selectedCampaignId])

  // get time online
  const getTimeOnline = (agent: TAgentDashboard) => {
    const loggedTime = isString(agent.timeOnline)
      ? parseFloat(agent.timeOnline)
      : agent.timeOnline
    const ongoingTime = isString(agent.ongoingTime)
      ? parseFloat(agent.ongoingTime)
      : agent.ongoingTime
    const seconds = Math.ceil(loggedTime + ongoingTime)
    return seconds >= 0 ? formatDuration(seconds) : ''
  }

  // re-fetch agent dashboard data every 5 seconds
  // useEffect(() => {
  //   if (user?.role !== ERoles.AGENT && REFETCH_AGENT_DASHBOARD_TIMEOUT) {
  //     const interval = setInterval(() => {
  //       getCurrentAgentDashboard(dispatch, setAgentDashboard)
  //     }, REFETCH_AGENT_DASHBOARD_TIMEOUT)
  //
  //     return () => clearInterval(interval)
  //   }
  // }, [REFETCH_AGENT_DASHBOARD_TIMEOUT, dispatch])

  const reFetchTimeout = 5000
  useEffect(() => {
    console.info(`user role ${user?.role}`)
    if (user?.role === ERoles.AGENT && reFetchTimeout) {
      const interval = setInterval(() => {
        getCurrentAgentDashboard(dispatch, setAgentDashboard)
      }, reFetchTimeout)

      return () => clearInterval(interval)
    }
  }, [user?.role, REFETCH_AGENT_DASHBOARD_TIMEOUT, dispatch])

  // AUT-198 - Auto-move agent from feedback to hold after 60s if no feedback is given
  const [feedbackTimeoutId, setFeedbackTimeoutId] = useState<NodeJS.Timeout | null>(null)

  // (also if pbx agent state is another - system should update it)
  useEffect(() => {
    const isAgentOnFeedback =
      pbxStatus.status === 'pause' && pbxStatus.reason === 'feedback'
    if (user?.role === ERoles.AGENT && isAgentOnFeedback) {
      const timeoutId = setTimeout(() => {
        console.info(`[FEEDBACK TIMOUT 60 sec]! => hold`, new Date(), `leadId: ${lead} `)
        onCallFeedback('NAF')
      }, +FEEDBACK_TIMEOUT)
      setFeedbackTimeoutId(timeoutId)

      // clear on out
      return () => {
        clearTimeout(timeoutId)
        setFeedbackTimeoutId(null)
      }
    }
    // if changed - clear
    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId)
      setFeedbackTimeoutId(null)
    }
  }, [pbxStatus.status, pbxStatus.reason, dispatch, lead?.campaign?.holdTime, completed])

  // Show selected campaign name
  const showSelectedCampaignName = (): string => {
    let result = '-'
    if (selectedCampaignId && !agentDashboard?.currentCampaignName) {
      const found = agentAssignedCampaigns.find((c) => c.id === +selectedCampaignId)
      if (found) {
        result = found.name
      }
    } else if (agentDashboard?.currentCampaignName) {
      result = agentDashboard.currentCampaignName
    }
    return result
  }

  const showDelayedUntil = (): string => {
    let result = '-'
    if (selectedCampaignId && !agentDashboard?.currentCampaignName) {
      const found = agentAssignedCampaigns.find((c) => c.id === +selectedCampaignId)
      if (found && found?.nearestCallTime) {
        return formatDelayedUntil(found.nearestCallTime) || '-'
      }
    } else if (agentDashboard?.currentCampaignNearestCallTime) {
      return formatDelayedUntil(agentDashboard.currentCampaignNearestCallTime) || '-'
    }
    return result
  }

  // Check if health check modal should be shown
  const isChecking =
    healthStatus.api.status === 'loading' ||
    healthStatus.websocket.status === 'loading' ||
    healthStatus.sip.status === 'loading' ||
    (healthStatus.sip.status === 'pending' &&
      (healthStatus.api.status === 'error' || healthStatus.websocket.status === 'error'))

  const shouldShowHealthModal =
    isChecking ||
    (modalState?.modalName === MODAL_NAMES.HEALTH_CHECK_STATUS && modalState.isOpen)

  if (shouldShowHealthModal) {
    return (
      <HealthCheckStatusModal
        status={healthStatus}
        onClose={handleCloseHealthCheck}
        onRetry={checkSystemHealth}
        open
      />
    )
  }

  return (
    <>
      <HealthCheckStatusModal
        status={healthStatus}
        onClose={handleCloseHealthCheck}
        onRetry={checkSystemHealth}
        open={
          modalState?.modalName === MODAL_NAMES.HEALTH_CHECK_STATUS && modalState.isOpen
        }
      />
      <Card fullWidth styles={{ marginTop: '40px', padding: '24px' }}>
        <CardTile>{t('agents.dashboard.title')}</CardTile>
        <Flex
          justify="space-between"
          align="start"
          styles={{ marginTop: '24px', flexWrap: 'wrap', gap: '24px' }}
        >
          <div
            style={{
              minWidth: '150px',
            }}
          >
            <Text color="main22"> {t('agents.dashboard.current-campaign')}</Text>
            <Flex align="start" justify="start" gap="8px">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Text variant="f4">{showSelectedCampaignName()}</Text>
                {!agentDashboard?.currentCampaignName && selectedCampaignId && (
                  <Text variant="f10" color="main22">
                    {t('agents.dashboard.not-online')}
                  </Text>
                )}
              </div>
              <div />
              <ButtonWithTooltip
                showTooltip={!agentDashboard?.currentCampaignName}
                // buttonDisabled={campaign.status === CAMPAIGN_STATUSES.ACTIVE}
                onClick={handleChangeCampaign}
                tooltipText="Change selected campaign"
                iconType="info"
                buttonType="edit"
              />
            </Flex>
            {/* <FilledButton onClick={handleChangeCampaign}> */}
            {/*  <div style={{ fontSize: '18px', fontWeight: '600' }}> */}
            {/*    {(selectedCampaignId && agentDashboard?.currentCampaignName) || */}
            {/*      'click to select campaign'} */}
            {/*  </div> */}
            {/* </FilledButton> */}
          </div>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              {t('agents.dashboard.next-call')}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {showDelayedUntil()}
            </div>
          </div>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              {t('agents.dashboard.time-online')}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {agentDashboard?.timeOnline || agentDashboard?.ongoingTime
                ? getTimeOnline(agentDashboard)
                : '0s'}
            </div>
          </div>

          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              {t('agents.dashboard.calls-handled')}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {agentDashboard?.callsHandled ?? 0}
            </div>
          </div>
        </Flex>
      </Card>

      <Flex justify="center" align="center" styles={{ flex: 1 }}>
        {pbxStatus.status === 'pause' && pbxStatus.reason === 'feedback' && lead && (
          <Card
            padding="32px 60px"
            fullWidth
            styles={{ textAlign: 'center' }}
            maxWidth="max-content"
          >
            <Text variant="f2">{t('feedback')}</Text>
            <Flex
              justify="center"
              direction="row"
              styles={{ marginTop: '24px', marginBottom: '24px' }}
            >
              <Flex align="start" direction="column">
                <Text>
                  {`${t('lead')}: `} {lead?.lead?.name || 'unknown'}
                </Text>
                <Text>
                  {`${t('country')}: `}{' '}
                  {lead?.leadCountryCode
                    ? getCountryName(lead?.leadCountryCode)
                    : 'unknown'}
                </Text>
              </Flex>
            </Flex>
            <Flex justify="center">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridRepeatCount(
                    leadStatuses.length,
                  )}, 1fr)`,
                  gridRowGap: '24px',
                  gridColumnGap: '32px',
                }}
              >
                {leadStatuses
                  .filter((status) => !status.feedbackDisabled)
                  .map(({ name, value }) => (
                    <div key={value}>
                      <Text
                        styles={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          cursor: 'pointer',
                          padding: '6px',
                          border: '1px solid',
                          borderColor: palette.overlay,
                          borderRadius: '4px',
                          width: '100px',
                          height: '55px',
                          ':hover': {
                            borderColor: palette.main21,
                          },
                        }}
                        variant="f8"
                        onClick={() => onCallFeedback(value)}
                      >
                        {name}
                      </Text>
                    </div>
                  ))}
              </div>
            </Flex>
          </Card>
        )}
        {!(pbxStatus.status === 'oncall' || pbxStatus.status === 'pause') &&
          !lead &&
          !endedCall &&
          !callDuration && (
            <Text styles={{ textAlign: 'center' }} variant="f4">
              {t('noCalls')}
            </Text>
          )}
        {pbxStatus.status === 'oncall' && (
          <Card padding="32px 68px" fullWidth maxWidth={582}>
            <Text styles={{ textAlign: 'center', marginBottom: '40px' }} variant="f2">
              {t('newCall')}
            </Text>
            <Flex direction="column" align="center" gap="48px">
              <CallWindow
                endedCall={endedCall}
                setDuration={(duration) => setCallDuration(duration)}
                callData={lead || undefined}
                leadStatuses={leadStatuses}
              />
              <CallButton onClick={() => handleEndCall()} isLoading={endedCall}>
                <CallIcon />
              </CallButton>
            </Flex>
          </Card>
        )}
      </Flex>
      {showModal &&
        (agentAssignedCampaigns.length > 1 || agentAssignedCampaigns.length === 0) && (
          <SelectAgentCampaignModal
            // campaigns={campaigns}
            onSelectedCampaign={onSelectedCampaign}
            onSelectCampaign={onSubscribeCampaignStatus}
            callback={(id: string | undefined) => {
              if (id) {
                // dispatch(agentActions.setSipCanConnect(true))
                // dispatch(agentActions.setStatusAsync('start'))
                setOnSelectedCampaign(false)
                // onSubscribeCampaignStatus(id) // cause already subscribed in modal submit
              }
            }}
            // campaignCompleted={campaignCompleted}
            onClose={() => campaignCompleted && setCampaignCompleted(false)}
          />
        )}
    </>
  )
}
