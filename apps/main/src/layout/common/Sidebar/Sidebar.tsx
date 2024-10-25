import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useMenuLinks } from '@/layout/common/Sidebar/hooks/use-menu-links'
import { Flex } from '@/components/Flex'
import { useAuth } from '@/features/common/user'
import { Text } from '@peiko/components/Text'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { LogoutIcon } from '@/icons/LogoutIcon'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { useDisableClickOnCall } from 'main/src/hooks/use-disable-click-on-call'
import { SidebarItem } from './components/SidebarItem'
import { Accordion, Container, MenuItem } from './styles/Sidebar.styled'

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('auth')
  const { logoutAsync } = useAuth()
  const links = useMenuLinks()
  const { pathname } = useRouter()
  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()

  const handleLogout = () => {
    if (menuDisabled) {
      showErrorMessage()
    } else {
      logoutAsync()
    }
  }

  return (
    <Container>
      <Flex direction="column" width="100%">
        {links.map((item) => (
          <Accordion
            defaultOpen={!!item.links.find(({ link }) => pathname === link)}
            containerStyles={() => ({ border: 'none' })}
            key={item.title}
            header={({ isOpen }) => (
              <MenuItem
                isOpen={isOpen}
                align="center"
                justify="space-between"
                padding="8px 16px"
              >
                <Flex align="center" gap="8px">
                  {item.icon}
                  <Text color="base">{item.title}</Text>
                </Flex>
                <ArrowIcon
                  direction={isOpen ? 'up' : 'down'}
                  color="base"
                  width="16px"
                  height="16px"
                />
              </MenuItem>
            )}
            disabled={menuDisabled}
            handleDisabledToggle={showErrorMessage}
          >
            {item.links.map((item) => (
              <SidebarItem key={item.title} link={item.link} title={item.title} />
            ))}
          </Accordion>
        ))}
      </Flex>
      <BaseButton width="fit-content" onClick={handleLogout}>
        <MenuItem align="center" gap="8px" justify="space-between" padding="8px 16px">
          <LogoutIcon color={menuDisabled ? 'overlay' : 'base'} />
          <Text color={menuDisabled ? 'overlay' : 'base'}>{t('logout-btn')}</Text>
        </MenuItem>
      </BaseButton>
    </Container>
  )
}
