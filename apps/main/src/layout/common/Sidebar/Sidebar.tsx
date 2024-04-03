import useTranslation from 'next-translate/useTranslation'
import { useMenuLinks } from '@/layout/common/Sidebar/hooks/use-menu-links'
import { Flex } from '@/components/Flex'
import { useAuth } from '@/features/common/user'
import { Container } from './styles/Sidebar.styled'
import { SidebarItem } from './components/SidebarItem'

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('common')
  const { logoutAsync } = useAuth()
  const links = useMenuLinks()

  const handleLogout = () => {
    logoutAsync()
  }

  return (
    <Container>
      <Flex direction="column" width="100%">
        {links.map((item) => (
          <SidebarItem key={item.link} link={item.link} title={item.title} />
        ))}
      </Flex>
      <SidebarItem title={t('logout')} onClick={handleLogout} />
    </Container>
  )
}
