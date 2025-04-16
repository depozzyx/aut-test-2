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
import { agentActions } from '@/features/common/agentStatus/store'
import { useSIPService } from '@/features/calls/hooks/useSIPService'
import { RTCSession } from 'jssip/lib/RTCSession'
import { CallTimer } from './CallTimer'
import { Container } from './Header.styled'

const logo = '/images/logo.png'

export const Header: FC = () => {
  const { dispatch } = useRedux()
  const { headerRef } = useHeaderHeight()
  const { user } = useAuth()

  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()

  useEffect(() => {
    console.warn('HEADER get asyncGetAgentAssignedCampaigns')
    dispatch(asyncGetAgentAssignedCampaigns())
  }, [])

  const [rtcSession, setRtcSession] = useState<RTCSession | null>(null)
  const { connect, ua, makeEchoTest, hangupSip } = useSIPService(
    true,
    rtcSession,
    setRtcSession,
  )

  const connectToSip = () => {
    const isSipConnected = ua?.isConnected()
    if (!isSipConnected) {
      connect()
    }

    setTimeout(() => {
      makeEchoTest()
    }, 500)
  }

  const disconnectSip = () => hangupSip(true)

  const onClickEchoTest = () => {
    if (rtcSession) {
      hangupSip(true)
    } else {
      dispatch(agentActions.setHasCurrentRTCSession(true))
      dispatch(agentActions.setSipCanConnect(false))
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
          {rtcSession && rtcSession?.status !== 8 && (
            <CallTimer onClick={disconnectSip} />
          )}
          <UserProfile
            disabled={menuDisabled}
            onClickEchoTest={onClickEchoTest}
            disconnectSip={disconnectSip}
            rtcSession={rtcSession}
          />
        </Flex>
      </Flex>
    </Container>
  )
}
