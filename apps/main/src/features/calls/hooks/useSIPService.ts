import { useEffect, useRef, useState } from 'react'
import JsSIP, { UA } from 'jssip'
import {
  UAConfiguration,
  IncomingRTCSessionEvent,
  OutgoingRTCSessionEvent,
} from 'jssip/lib/UA'
import { AnswerOptions } from 'jssip/lib/RTCSession'
import { useAuth } from '@/features/common/user'
import { useRedux } from '@/hooks/use-redux'
import { errorActions } from '@/features/common/error'
import { callSocket } from 'api/socket/call'
import { socket } from 'api/socket/Socket'
import { TCallsInit } from 'api/socket/call/types'
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'

const TEXTS = {
  SUBSCRIBE_CALLS: 'Subscribe calls',
  SUBSCRIBE_CALLS_END: 'Subscribe calls end',
}

export const useSIPService = (): {
  connect: () => void
  disconnect: () => void
  ua: UA | null
  endCall: () => void
  lead: TCallsInit | null
  endedCall: boolean
  setEndedCall: (endedCall: boolean) => void
  setLead: (lead: TCallsInit | null) => void
} => {
  const { pbxAuth } = useAuth()
  const { dispatch, select } = useRedux()
  const [endedCall, setEndedCall] = useState(false)
  const [lead, setLead] = useState<TCallsInit | null>(null)
  const { status } = select(agentStatusSelector)
  const statusRef = useRef(status)

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

  const endCall = () => {
    ua?.terminateSessions()
    setEndedCall(true)
  }

  const onSubscribeCalls = () => {
    callSocket.callInit({
      id: TEXTS.SUBSCRIBE_CALLS,
      callback: (e) => {
        dispatch(agentActions.setStatusAsync('on-call'))
        setLead(e)
      },
    })
    callSocket.callEnd({
      id: TEXTS.SUBSCRIBE_CALLS_END,
      callback: endCall,
    })
  }

  const onUnsubscribeCalls = () => {
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS)
    socket.unsubscribe(TEXTS.SUBSCRIBE_CALLS_END)
  }

  const connect = () => {
    ua?.start()
    onSubscribeCalls()
  }

  const disconnect = () => {
    ua?.stop()
    onUnsubscribeCalls()
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
              if (statusRef.current && statusRef.current !== 'finish') {
                dispatch(agentActions.setStatusAsync('pause'))
              }
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
