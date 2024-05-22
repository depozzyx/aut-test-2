import { FC } from 'react'
import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { Flex } from '@/components/Flex'
import { BaseImage } from '@peiko/components/BaseImage'
import logo from '@/assets/img/logo.png'
import { UserProfile } from '@/layout/common/Header/components/UserProfile'
import { AgentStatus } from '@/features/common/agentStatus/AgentStatus'
import { useAuth } from '@/features/common/user'
import { Container } from './Header.styled'

export const Header: FC = () => {
  const { headerRef } = useHeaderHeight()
  const { user } = useAuth()

  return (
    <Container ref={headerRef}>
      <Flex width="100%" justify="space-between">
        <Flex align="center">
          <BaseImage src={logo} alt="logo" width={100} height={34} />
        </Flex>
        <Flex align="center" gap="57px">
          {user?.role === 'agent' && <AgentStatus />}
          <UserProfile />
        </Flex>
      </Flex>
    </Container>
  )
}
