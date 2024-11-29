import { useEffect, useState } from 'react'
import JsSIP, { UA } from 'jssip'
import {
  UAConfiguration,
  IncomingRTCSessionEvent,
  OutgoingRTCSessionEvent,
} from 'jssip/lib/UA'
import { AnswerOptions } from 'jssip/lib/RTCSession'
import { useAuth } from '@/features/common/user'
import { useRedux } from '@/hooks/use-redux'
import { errorActions, handleRestError } from '@/features/common/error'
import { callSocket } from 'api/socket/call'
import { agentSocket } from 'api/socket/agent'
import { socket } from 'api/socket/Socket'
import { TCallsInit } from 'api/socket/call/types'
import { apiAgents } from '@/api-rest/agents'
import { agentActions } from '@/features/common/agentStatus/store'
import { TAgentWorkStatus } from '@/features/agents/types'

const TEXTS = {
  SUBSCRIBE_CALLS: 'Subscribe calls',
  SUBSCRIBE_CALLS_END: 'Subscribe calls end',
  SUBSCRIBE_AGENT_STATUS: 'Subscribe agent status',
}

export const useSIPService = (): {
  connect: () => void
  disconnect: () => void
  ua: UA | null
  endCall: (isClient?: boolean) => void
  lead: TCallsInit | null
  endedCall: boolean
  setEndedCall: (endedCall: boolean) => void
  setLead: (lead: TCallsInit | null) => void
} => {
  const { pbxAuth } = useAuth()
  const { dispatch } = useRedux()
  const [endedCall, setEndedCall] = useState(false)
  const [lead, setLead] = useState<TCallsInit | null>(null)
  const setStatus = (status: TAgentWorkStatus) => {
    // eslint-disable-next-line no-console
    console.debug(`set status ${status}`)
    dispatch(agentActions.setStatusAsync(status))
  }

  const sipOptions: AnswerOptions = {
    pcConfig: {
      rtcpMuxPolicy: 'negotiate' as 'require',
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] },
        { urls: ['stun:stun1.l.google.com:19302'] },
        { urls: ['stun:stun2.l.google.com:19302'] },
      ],
    },
    mediaConstraints: {
      audio: true,
      video: false,
    },
    rtcOfferConstraints: {
      offerToReceiveAudio: true,
    },
  }

  const jsSIPSocket = new JsSIP.WebSocketInterface('wss://dev.voipenv.uk:7777/ws')
  const [ua, setUA] = useState<UA | null>(null)

  const hangupAsync = async () => {
    try {
      await apiAgents.hangup()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const endCall = async (isClient?: boolean) => {
    setEndedCall(true)
    if (isClient) await hangupAsync()
  }

  const onSubscribeCalls = () => {
    callSocket.callInit({
      id: TEXTS.SUBSCRIBE_CALLS,
      callback: (e) => {
        setLead(e)
      },
    })
    callSocket.callEnd({
      id: TEXTS.SUBSCRIBE_CALLS_END,
      callback: () => endCall(),
    })
  }

  const onSubscribeAgentStatus = () => {
    agentSocket.agentStatusUpdate({
      id: TEXTS.SUBSCRIBE_AGENT_STATUS,
      callback: (e) => {
        setStatus(e.status)
      },
    })
  }

  const onUnsubscribeCalls = () => {
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS)
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS_END)
  }

  const onUnsubscribeAgentStatus = () => {
    socket.unsubscribe(TEXTS.SUBSCRIBE_AGENT_STATUS)
  }

  const connect = () => {
    ua?.start()
    onSubscribeCalls()
    onSubscribeAgentStatus()
  }

  const disconnect = () => {
    ua?.stop()
    onUnsubscribeCalls()
    onUnsubscribeAgentStatus()
  }

  useEffect(() => {
    if (pbxAuth)
      setUA(() => {
        const configuration: UAConfiguration = {
          uri: `sip:${pbxAuth?.username}@${pbxAuth?.domain}`,
          password: pbxAuth?.password,
          sockets: jsSIPSocket,
          register: true,
          ...sipOptions,
          connection_recovery_min_interval: 1,
          connection_recovery_max_interval: 1,
        }
        const user = new JsSIP.UA(configuration)

        user.on('connected', (e) => {
          console.warn('Connected to SIP server', e)
        })

        user.on('disconnected', (e) => {
          console.warn('Disconnected from SIP server', e)
        })

        user.on(
          'newRTCSession',
          ({ session }: IncomingRTCSessionEvent | OutgoingRTCSessionEvent) => {
            console.warn('New session started', session)

            const answerCall = async () => {
              if (session) {
                session.answer(sipOptions)
              } else {
                console.warn('No call session')
              }
            }
            setTimeout(() => {
              answerCall()
            }, 2000)

            session.on('peerconnection', ({ peerconnection }) => {
              const pc = peerconnection
              pc.ontrack = (event) => {
                console.warn('New track added:', event.track)
                const remoteStream = event.streams[0]
                const audioElement = document.createElement('audio')
                audioElement.srcObject = remoteStream
                audioElement.autoplay = true
                document.body.appendChild(audioElement)
              }
            })

            session.on('ended', (e) => {
              console.warn('Call ended', e)
            })

            session.on('failed', (e) => {
              console.error('Call failed', e)
              if (e.cause) dispatch(errorActions.showGlobalError(e.cause))
            })
          },
        )

        user.on('registrationFailed', (e) => {
          console.error('Registration failed', e)
          if (e.cause) dispatch(errorActions.showGlobalError(e.cause))
        })

        return user
      })
  }, [pbxAuth])

  return { connect, disconnect, ua, endCall, lead, endedCall, setEndedCall, setLead }
}
