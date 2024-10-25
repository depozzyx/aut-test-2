import { FC } from 'react'
import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { Flex } from '@/components/Flex'
import { BaseImage } from '@peiko/components/BaseImage'
import { UserProfile } from '@/layout/common/Header/components/UserProfile'
import { AgentStatus } from '@/features/common/agentStatus/AgentStatus'
import { useAuth } from '@/features/common/user'
import { useDisableClickOnCall } from 'main/src/hooks/use-disable-click-on-call'
import { Container } from './Header.styled'

const logo = '/images/logo.png'

export const Header: FC = () => {
  const { headerRef } = useHeaderHeight()
  const { user } = useAuth()
  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()

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
          {user?.role === 'agent' && <AgentStatus />}
          <UserProfile disabled={menuDisabled} />
        </Flex>
      </Flex>
    </Container>
  )
}
