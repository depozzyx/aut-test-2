/* eslint-disable no-console */
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
import { errorActions } from '@/features/common/error'

export const useSIPService = (): {
  connect: () => void
  disconnect: () => void
  ua: UA | null
  endCall: () => void
} => {
  const { pbxAuth } = useAuth()
  const { dispatch } = useRedux()

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

  const socket = new JsSIP.WebSocketInterface('wss://dev.voipenv.uk:7777/ws')
  const [ua, setUA] = useState<UA | null>(null)

  const connect = () => {
    ua?.start()
  }

  const disconnect = () => {
    ua?.stop()
  }

  const endCall = () => {
    ua?.terminateSessions()
  }

  useEffect(() => {
    if (pbxAuth)
      setUA(() => {
        const configuration: UAConfiguration = {
          uri: `sip:${pbxAuth?.username}@${pbxAuth?.domain}`,
          password: pbxAuth?.password,
          sockets: socket,
          register: true,
          ...sipOptions,
          connection_recovery_min_interval: 1,
          connection_recovery_max_interval: 1,
        }
        const user = new JsSIP.UA(configuration)

        user.on('connected', (e) => {
          console.log('Connected to SIP server', e)
        })

        user.on('disconnected', (e) => {
          console.log('Disconnected from SIP server', e)
        })

        user.on(
          'newRTCSession',
          ({ session }: IncomingRTCSessionEvent | OutgoingRTCSessionEvent) => {
            console.log('New session started', session)

            const answerCall = async () => {
              if (session) {
                session.answer(sipOptions)
              } else {
                console.log('No call session')
              }
            }
            setTimeout(() => {
              answerCall()
            }, 2000)

            session.on('peerconnection', ({ peerconnection, ...e }) => {
              console.log({ peerconnection, e })
              const pc = peerconnection
              pc.ontrack = (event) => {
                console.log('New track added:', event.track)
                const remoteStream = event.streams[0]
                const audioElement = document.createElement('audio')
                audioElement.srcObject = remoteStream
                audioElement.autoplay = true
                document.body.appendChild(audioElement)
              }
            })

            session.on('accepted', () => {
              console.log('Call accepted')
            })

            session.on('ended', (e) => {
              console.log('Call ended', e)
            })

            session.on('failed', (e) => {
              console.log('Call failed', e)
              if (e.cause) dispatch(errorActions.showGlobalError(e.cause))
            })
          },
        )

        user.on('registrationFailed', (e) => {
          console.log('Registration failed', e)
          if (e.cause) dispatch(errorActions.showGlobalError(e.cause))
        })

        return user
      })
  }, [pbxAuth])

  return { connect, disconnect, ua, endCall }
}
