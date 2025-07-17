import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { UserRoleIcon } from '@/features/common/user/components/UserRoleIcon'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { LogoutIcon } from '@peiko/components/icons/LogoutIcon'
import { SettingsIcon } from '@peiko/components/icons/SettingsIcon'
import { ROUTES } from '@/routes'
import { useAuth } from '@/features/common/user'
import { TFlexComponentProps } from '@/components/Flex/types'
import { TUserRoles } from '@/types/roles'
import { ERoles } from '@/constants/profile'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { EnvelopeIcon } from '@/icons/EnvelopeIcon'
import { agentStatusSelector } from '@/features/common/agentStatus/store'
import { useRedux } from '@/hooks/use-redux'
import { CallIcon } from '@/icons/CallIcon'
import { CallButton } from '@/features/calls/components/CallButton/CallButton'
import { Divider, ItemWrapper } from './ProfilePopover.styled'

export interface IProfilePopoverProps {
  name?: string
  phone?: string
  email?: string
  userRole?: TUserRoles
  onClickEchoTest: () => void
  disconnectSip: () => void
}

interface IPopoverMenuItemProps {
  icon?: ReactElement
  title?: string
  onClick?: () => void
}

const PopoverMenuItem = ({
  icon,
  title,
  onClick,
  ...rest
}: IPopoverMenuItemProps & TFlexComponentProps): JSX.Element => (
  <ItemWrapper align="center" gap={8} onClick={onClick} {...rest}>
    {icon}
    <Text variant="f9">{title}</Text>
  </ItemWrapper>
)

export const ProfilePopover = ({
  name,
  email,
  userRole,
  onClickEchoTest,
  disconnectSip,
}: IProfilePopoverProps): JSX.Element => {
  const { t } = useTranslation('user')
  const { setModal } = useModals()

  const router = useRouter()

  const { logoutAsync } = useAuth()

  const handleLogout = () => {
    if (userRole === 'agent') {
      disconnectSip()
      setModal({ modalName: MODAL_NAMES.AGENT_LOGOUT, isOpen: true })
    } else {
      logoutAsync()
    }
  }

  const handleGoToSettings = async () => {
    await router.push(ROUTES.SETTINGS_ACCOUNT_MANAGEMENT)
  }

  const { select } = useRedux()
  const { pbxStatus, isEchoTestMode } = select(agentStatusSelector)

  return (
    <Flex direction="column" align="center" gap={30}>
      <Flex direction="column" align="center" gap={8}>
        {userRole && (
          <UserRoleIcon userRole={userRole} iconSize="28px" variant="medium" />
        )}
        <Flex direction="column" align="center">
          <Text variant="f4">{name}</Text>
          <Text variant="f6" color="main22">
            {t(`roles.${userRole}`)}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap={16}>
        {email && <PopoverMenuItem icon={<EnvelopeIcon />} title={email} />}
        {userRole !== ERoles.AGENT && (
          <PopoverMenuItem
            icon={<SettingsIcon />}
            title={t('routing:settings')}
            onClick={handleGoToSettings}
            cursor="pointer"
          />
        )}
        {userRole === ERoles.AGENT && pbxStatus.status === 'offline' && (
          <PopoverMenuItem
            icon={
              isEchoTestMode ? (
                <CallButton size="s">
                  <CallIcon />
                </CallButton>
              ) : (
                <UserRoleIcon userRole={userRole} />
              )
            }
            title={isEchoTestMode ? 'Finish echo test' : 'Echo Test'}
            onClick={onClickEchoTest}
            cursor="pointer"
          />
        )}{' '}
        <Divider />
        <PopoverMenuItem
          icon={<LogoutIcon color="main5" />}
          title={t('auth:logout-btn')}
          onClick={handleLogout}
          cursor="pointer"
        />
      </Flex>
    </Flex>
  )
}
