import { FC } from 'react'
import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { Flex } from '@/components/Flex'
import { BaseImage } from '@peiko/components/BaseImage'
import { UserProfile } from '@/layout/common/Header/components/UserProfile'
import { Container } from './Header.styled'

const logo = '/images/logo.png'

export const Header: FC = () => {
  const { headerRef } = useHeaderHeight()

  return (
    <Container ref={headerRef}>
      <Flex width="100%" justify="space-between">
        <Flex align="center">
          <BaseImage src={logo} alt="logo" width={100} height={34} />
        </Flex>
        <UserProfile />
      </Flex>
    </Container>
  )
}
