import { useEffect, useState } from 'react'
import JsSIP, { UA } from 'jssip'
import {
  UAConfiguration,
  IncomingRTCSessionEvent,
  OutgoingRTCSessionEvent,
} from 'jssip/lib/UA'
import { AnswerOptions, RTCSession } from 'jssip/lib/RTCSession'
import { useAuth } from '@/features/common/user'
import { useRedux } from '@/hooks/use-redux'
import { errorActions, handleRestError } from '@/features/common/error'
import { callSocket } from 'api/socket/call'
import { socket } from 'api/socket/Socket'
import { TCallsInit } from 'api/socket/call/types'
import { apiAgents } from '@/api-rest/agents'
import { API_SECRET_KEY } from '@/constants/config'
import { decrypt } from '@peiko/utils/crypto-js'
import { useStore } from 'react-redux'
import { agentActions } from '@/features/common/agentStatus/store'
import { apiCalls } from '@/api-rest/calls'

const TEXTS = {
  SUBSCRIBE_CALLS: 'Subscribe calls',
  SUBSCRIBE_CALLS_END: 'Subscribe calls end',
}

export const SipSessionStatusMap = {
  0: 'STATUS_NULL',
  1: 'STATUS_INVITE_SENT',
  2: 'STATUS_1XX_RECEIVED',
  3: 'STATUS_INVITE_RECEIVED',
  4: 'STATUS_WAITING_FOR_ANSWER',
  5: 'STATUS_ANSWERED',
  6: 'STATUS_WAITING_FOR_ACK',
  7: 'STATUS_CANCELED',
  8: 'STATUS_TERMINATED',
  9: 'STATUS_CONFIRMED',
}

export const useSIPService = (
  echoTestMode?: boolean,
  currentSession?: RTCSession | null,
  setCurrentSession?: (session: RTCSession | null) => void,
): {
  connect: () => void
  keepAlive: () => void
  disconnect: () => void
  ua: UA | null
  endCall: (isClient?: boolean, isEchoTest?: boolean) => void
  hangupSip: (isEchoTest?: boolean) => void
  makeEchoTest: () => void
  endedCall: boolean
  setEndedCall: (endedCall: boolean) => void
  lead: TCallsInit | null
  setLead: (lead: TCallsInit | null) => void
  onSubscribeCalls: () => void
  onUnsubscribeCalls: () => void
} => {
  const { pbxAuth } = useAuth()
  const { dispatch } = useRedux()
  const store = useStore()

  const [endedCall, setEndedCall] = useState(false)

  const [lead, setLead] = useState<TCallsInit | null>(null)

  let iceCandidateTimeout: NodeJS.Timeout | number | null = null

  const sipOptions: AnswerOptions = {
    pcConfig: {
      rtcpMuxPolicy: 'negotiate' as 'require',
      iceServers: [
        {
          urls: process.env.NEXT_PUBLIC_SIP_COTURN_URL as string,
          username: process.env.NEXT_PUBLIC_SIP_COTURN_USER,
          credential: process.env.NEXT_PUBLIC_SIP_COTURN_PASSWORD,
        },
      ],
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

  const jsSIPSocket = new JsSIP.WebSocketInterface(`wss://${pbxAuth?.domain}:7777/ws`)
  const [ua, setUA] = useState<UA | null>(null)

  const hangupAsync = async () => {
    try {
      await apiAgents.hangup()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const onUnsubscribeCalls = () => {
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS)
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS_END)
  }

  const disconnect = () => {
    // eslint-disable-next-line no-console
    console.log('disconnect => unregister and stop')
    ua?.unregister()
    ua?.stop()
    // if (!echoTestMode) onUnsubscribeCalls()
  }

  const makeEchoTest = () => {
    if (pbxAuth?.username) return apiCalls.makeEchoTest({ exten: pbxAuth.username })
  }

  const hangupSip = (isEchoTest?: boolean) => {
    console.warn('hangupSip', SipSessionStatusMap[currentSession?.status || 0])
    // IF TERMINATED
    if (currentSession && currentSession?.status !== 8) {
      currentSession.terminate()
      dispatch(agentActions.setHasCurrentRTCSession(false))
    }
    if (setCurrentSession) {
      setCurrentSession(null)
    }
    if (isEchoTest) {
      // todo: add status text in log output
      console.warn(
        'hangup sip echo test and disconnect',
        SipSessionStatusMap[currentSession?.status || 0],
      )
      ua?.terminateSessions()
      disconnect()
    }
  }

  const endCall = async (isClient?: boolean) => {
    setEndedCall(true)
    if (isClient) await hangupAsync()
  }

  const initCallCallback = (e: TCallsInit) => {
    // console.info(`FROM PBX WS INIT CALL \n: ${JSON.stringify(e, null, 2)}`) // TODO tmp added for check init call event data
    setLead(e)
  }
  const onSubscribeCalls = () => {
    callSocket.callInit({
      id: TEXTS.SUBSCRIBE_CALLS,
      callback: initCallCallback,
    })
    callSocket.callEnd({
      id: TEXTS.SUBSCRIBE_CALLS_END,
      callback: () => endCall(),
    })
  }

  const connect = () => {
    ua?.start()
    // onSubscribeCalls()
  }

  const keepAlive = () => {
    setInterval(() => {
      const { sipCanConnect } = store.getState().agentStatus
      // eslint-disable-next-line no-console
      if (ua && ua?.isConnected() && pbxAuth?.username && sipCanConnect) {
        // eslint-disable-next-line no-console
        // console.info(`sipCanConnect ${sipCanConnect}`)
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ua.sendOptions(`sip:${pbxAuth?.username}@${pbxAuth?.domain}`, null, {})
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Keep-alive ping error (safe to ignore):', e)
          }
        }
      }
    }, 10000)
  }

  useEffect(() => {
    if (pbxAuth) {
      if (ua) {
        ua.terminateSessions()
        ua.unregister()
        ua.stop()
      } else {
        setUA(() => {
          const password = decrypt(pbxAuth?.password, API_SECRET_KEY)
          // console.warn(password) // debug

          const configuration: UAConfiguration = {
            uri: `sip:${pbxAuth?.username}@${pbxAuth?.domain}`,
            password,
            sockets: jsSIPSocket,
            register: true,
            ...sipOptions,
            // connection_recovery_min_interval: 1,
            // connection_recovery_max_interval: 1,
          }
          const user = new JsSIP.UA(configuration)

          user.on('registered', () => {
            console.warn('SIP registered')
          })

          user.on('connected', () => {
            console.warn('SIP connected')
          })

          user.on('disconnected', (e) => {
            console.warn('Disconnected from SIP server', e)
            dispatch(agentActions.setSipConnected(false))
          })

          user.on(
            'newRTCSession',
            ({ session }: IncomingRTCSessionEvent | OutgoingRTCSessionEvent): void => {
              // console.warn('New session started', session?.direction)

              const answerCall = async () => {
                if (session) {
                  session.answer(sipOptions)
                  if (echoTestMode && setCurrentSession) {
                    dispatch(agentActions.setHasCurrentRTCSession(true))
                    setCurrentSession(session)
                  }
                } else {
                  console.warn('No call session')
                }
              }
              setTimeout(() => {
                answerCall()
              }, 2000)

              session.on('peerconnection', ({ peerconnection }) => {
                // eslint-disable-next-line no-param-reassign
                peerconnection.ontrack = (event) => {
                  console.warn('New track added:', event.track)
                  const remoteStream = event.streams[0]
                  const audioElement = document.createElement('audio')
                  audioElement.srcObject = remoteStream
                  audioElement.autoplay = true
                  document.body.appendChild(audioElement)
                }
              })

              session.on('icecandidate', (event) => {
                const iceCandidate = event?.candidate
                if (typeof iceCandidateTimeout === 'number')
                  clearTimeout(iceCandidateTimeout)

                iceCandidateTimeout = setTimeout(() => event.ready(), 5000)

                if (
                  iceCandidate &&
                  iceCandidate.type === 'srflx' &&
                  iceCandidate.relatedAddress &&
                  iceCandidate.relatedPort
                ) {
                  if (iceCandidateTimeout != null) {
                    event.ready()
                  }
                }
              })

              session.on('ended', (e) => {
                console.warn('Call ended', e)
              })

              session.on('failed', (e) => {
                console.error('Call failed', e)
                if (e.cause) dispatch(errorActions.showGlobalError('SIP Call Failed'))
              })
            },
          )

          user.on('registrationFailed', (e) => {
            console.error('SIP Registration Failed', e)
            // todo set new work status
            if (e.cause) dispatch(errorActions.showGlobalError('SIP Registration Failed'))
          })

          return user
        })
      }
    }
  }, [pbxAuth])

  return {
    connect,
    keepAlive,
    disconnect,
    ua,
    makeEchoTest,
    hangupSip,
    endCall,
    lead,
    endedCall,
    setEndedCall,
    setLead,
    onSubscribeCalls,
    onUnsubscribeCalls,
  }
}
