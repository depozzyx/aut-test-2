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
import { agentActions, agentStatusSelector } from '@/features/common/agentStatus/store'
import { useRedux } from '@/hooks/use-redux'
import { useUnmount } from 'react-use'
import { ERoles } from '@/constants/profile'
import { useEffect } from 'react'
import { SidebarItem } from './components/SidebarItem'
import { Accordion, Container, MenuItem } from './styles/Sidebar.styled'
import { agentSocket } from '../../../api/socket/agent'
import { socket } from '../../../api/socket/Socket'

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('auth')
  const { dispatch, select } = useRedux()
  const { pbxStatus } = select(agentStatusSelector)

  const { logoutAsync, user } = useAuth()
  const links = useMenuLinks()
  const { pathname } = useRouter()
  const { menuDisabled, showErrorMessage } = useDisableClickOnCall()

  const handleLogout = () => {
    if (menuDisabled) {
      showErrorMessage()
    } else if (pbxStatus !== 'offline')
      dispatch(agentActions.setStatusAsync('finish', logoutAsync))
    else logoutAsync()
  }

  const onSubscribeAgentStatus = () =>
    agentSocket.agentStatusUpdate({
      id: 'Subscribe agent status',
      callback: (e) => {
        dispatch(agentActions.setPBXStatus(e.status))
      },
    })

  const onUnsubscribeAgentStatus = () => {
    socket.unsubscribe('Subscribe agent status')
  }

  useEffect(() => {
    if (user?.role === ERoles.AGENT) {
      setTimeout(() => onSubscribeAgentStatus(), 500)
    }
  }, [])

  useUnmount(() => {
    if (user?.role === ERoles.AGENT) {
      onUnsubscribeAgentStatus()
    }
  })

  useEffect(() => {
    if (user?.role === ERoles.AGENT) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault()
        dispatch(agentActions.setStatusAsync('finish'))
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

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
