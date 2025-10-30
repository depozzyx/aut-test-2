import React, { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { Flex } from '@/components/Flex'
import { BaseImage } from '@peiko/components/BaseImage'
import { UserProfile } from '@/layout/common/Header/components/UserProfile'
import { AgentStatus } from '@/features/common/agentStatus/AgentStatus'
import { useAuth, userSelectors } from '@/features/common/user'
import { useDisableClickOnCall } from 'main/src/hooks/use-disable-click-on-call'
import { useRedux } from '@/hooks/use-redux'
import { asyncGetAgentAssignedCampaigns } from '@/features/campaigns/store/campaigns'
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'
import { useSIPService } from '@/features/calls/hooks/useSIPService'
import { RTCSession } from 'jssip/lib/RTCSession'
import { useUnmount } from 'react-use'

import { MicrophoneButton } from '@/features/common/sip/MicrophoneButton'
import { CallTimer } from './CallTimer'
import { Container } from './Header.styled'

import { PhoneChip } from './PhoneChip'

const logo = '/images/logo.png'

let makeEchoTimeout: ReturnType<typeof setTimeout> | null = null

export const Header: FC = () => {
  const { dispatch, select } = useRedux()
  const { headerRef } = useHeaderHeight()
  const { user } = useAuth()
  const auth = select(userSelectors.user)

  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()
  const { whisperSpy, microPhoneState, isEchoTestMode, pbxStatus, hasCurrentRTCSession } =
    select(agentStatusSelector)

  useEffect(() => {
    dispatch(asyncGetAgentAssignedCampaigns())
  }, [])

  const [rtcSession, setRtcSession] = useState<RTCSession | null>(null)
  const {
    connect,
    ua,
    makeEchoTest,
    hangupSip,
    keepAlive,
    whisperTo,
    spyTo,
    disconnect,
    toggleMicrophone,
  } = useSIPService(true, rtcSession, setRtcSession, {
    onError: handleCallEnd,
    onCallEnd: handleCallEnd,
  })

  const disconnectSip = () => {
    hangupSip(isEchoTestMode)
  }

  function offEchoTest() {
    if (makeEchoTimeout) {
      clearTimeout(makeEchoTimeout)
    }
    disconnectSip()
    dispatch(agentActions.setHasCurrentRTCSession(false))
    dispatch(agentActions.setEchoTestMode(false))
  }

  const connectToEchoTest = () => {
    const isSipConnected = ua?.isConnected()
    if (!isSipConnected) {
      connect()
    }

    makeEchoTimeout = setTimeout(() => {
      makeEchoTest()
    }, 500)
  }

  const onClickEchoTest = () => {
    if (isEchoTestMode) {
      offEchoTest()
    } else {
      dispatch(agentActions.setSipCanConnect(false))
      dispatch(agentActions.setEchoTestMode(true))
      connectToEchoTest()
    }
  }

  const connectToSip = () => {
    const isSipConnected = ua?.isConnected()
    if (!isSipConnected) {
      connect()
      keepAlive()
    }
  }

  useEffect(() => {
    if (auth.user?.role !== 'agent' && auth.pbxAuth?.username && !ua?.isConnected()) {
      console.info(`CONNECTING TO SIP... [${auth.pbxAuth.username}]`)
      connectToSip()
    }
  }, [ua, auth.pbxAuth?.username])

  useUnmount(() => {
    if (ua?.isConnected()) {
      console.info(`DISCONNECTING FROM SIP... [${auth.pbxAuth?.username}]`)
      disconnectSip()
      disconnect()
    }
  })

  // Stable wrappers for functions passed to PhoneChip to avoid re-renders
  const handleWhisperTo = useCallback((exten: string) => whisperTo(exten), [whisperTo])
  const handleSpyTo = useCallback((exten: string) => spyTo(exten), [spyTo])
  const handleDisconnectSip = useCallback(() => disconnectSip(), [disconnectSip])
  const handleHangupSip = useCallback(() => {
    hangupSip(isEchoTestMode)
    setTimeout(() => {
      dispatch(agentActions.setWhisperSpy(undefined))
    }, 5000)
    dispatch(agentActions.setWhisperSpyLeadId(undefined))
  }, [hangupSip, isEchoTestMode])

  function handleCallEnd() {
    if (isEchoTestMode) {
      offEchoTest()
    }
    setTimeout(() => {
      dispatch(agentActions.setWhisperSpy(undefined))
    }, 5000)
    dispatch(agentActions.setWhisperSpyLeadId(undefined))
  }

  const microphoneEnabled = useMemo(
    () =>
      (user?.role === 'agent' && hasCurrentRTCSession) ||
      (user?.role !== 'agent' && rtcSession && whisperSpy?.mode !== 'spy'),
    [rtcSession, whisperSpy, hasCurrentRTCSession],
  )

  const microphoneColor = useMemo(() => {
    if (microphoneEnabled) {
      if (microPhoneState === 'on') {
        return 'main11'
      }
      return 'main13'
    }
    return 'main22'
  }, [microPhoneState, microphoneEnabled])

  useEffect(() => {
    if (rtcSession) toggleMicrophone()
  }, [microPhoneState])

  const onClickMicrophone = () =>
    dispatch(agentActions.setMicroPhoneState(microPhoneState === 'on' ? 'off' : 'on'))

  return (
    <Container ref={headerRef}>
      <Flex width="100%" justify="space-between">
        <Flex align="center">
          <BaseImage src={logo} alt="logo" width={100} height={34} />
        </Flex>
        <Flex
          align="center"
          gap="24px"
          onClick={menuDisabled ? showErrorMessage : undefined}
        >
          {user?.role === 'agent' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '10px',
              }}
            >
              <AgentStatus />
            </div>
          )}
          {isEchoTestMode && rtcSession && rtcSession?.status !== 8 && (
            <CallTimer onClick={onClickEchoTest} />
          )}
          {user?.role !== 'agent' && auth.pbxAuth?.username && (
            <PhoneChip
              whisperTo={handleWhisperTo}
              spyTo={handleSpyTo}
              disconnectSip={handleDisconnectSip}
              hangupSip={handleHangupSip}
            />
          )}
          <MicrophoneButton
            disabled={!microphoneEnabled}
            bgColor={microphoneColor}
            onClick={onClickMicrophone}
          />
          <UserProfile
            disabled={menuDisabled || pbxStatus.status !== 'offline'}
            onClickEchoTest={onClickEchoTest}
            disconnectSip={disconnectSip}
          />
        </Flex>
      </Flex>
    </Container>
  )
}
