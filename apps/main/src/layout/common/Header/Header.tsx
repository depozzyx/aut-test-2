import React, { FC, useEffect, useState } from 'react'
import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { Flex } from '@/components/Flex'
import { BaseImage } from '@peiko/components/BaseImage'
import { UserProfile } from '@/layout/common/Header/components/UserProfile'
import { AgentStatus } from '@/features/common/agentStatus/AgentStatus'
import { useAuth } from '@/features/common/user'
import { useDisableClickOnCall } from 'main/src/hooks/use-disable-click-on-call'
import { useRedux } from '@/hooks/use-redux'
import { asyncGetAgentAssignedCampaigns } from '@/features/campaigns/store/campaigns'
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'
import { useSIPService } from '@/features/calls/hooks/useSIPService'
import { RTCSession } from 'jssip/lib/RTCSession'
import { CallTimer } from './CallTimer'
import { Container } from './Header.styled'

const logo = '/images/logo.png'

let makeEchoTimeout: ReturnType<typeof setTimeout> | null = null

export const Header: FC = () => {
  const { dispatch, select } = useRedux()
  const { headerRef } = useHeaderHeight()
  const { user } = useAuth()

  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()

  const { isEchoTestMode } = select(agentStatusSelector)

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.info('HEADER get asyncGetAgentAssignedCampaigns')
    dispatch(asyncGetAgentAssignedCampaigns())
  }, [])

  const [rtcSession, setRtcSession] = useState<RTCSession | null>(null)
  const { connect, ua, makeEchoTest, hangupSip } = useSIPService(
    true,
    rtcSession,
    setRtcSession,
    {
      onError: offEchoTest,
      onCallEnd: offEchoTest,
    },
  )

  const disconnectSipEchoTest = () => {
    if (rtcSession) hangupSip(true)
  }

  function offEchoTest() {
    if (makeEchoTimeout) {
      clearTimeout(makeEchoTimeout)
    }
    disconnectSipEchoTest()
    dispatch(agentActions.setHasCurrentRTCSession(false))
    dispatch(agentActions.setEchoTestMode(false))
  }
  const connectToSip = () => {
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
      dispatch(agentActions.setHasCurrentRTCSession(true))
      dispatch(agentActions.setSipCanConnect(false))
      dispatch(agentActions.setEchoTestMode(true))
      connectToSip()
    }
  }

  return (
    <Container ref={headerRef}>
      <Flex width="100%" justify="space-between">
        <Flex align="center">
          <BaseImage src={logo} alt="logo" width={100} height={34} />
        </Flex>
        <Flex
          align="center"
          gap="57px"
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
          <UserProfile
            disabled={menuDisabled}
            onClickEchoTest={onClickEchoTest}
            disconnectSip={disconnectSipEchoTest}
          />
        </Flex>
      </Flex>
    </Container>
  )
}
