import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { UserRoleIcon } from '@/features/common/user/components/UserRoleIcon'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { LogoutIcon } from '@peiko/components/icons/LogoutIcon'
import { SettingsIcon } from '@peiko/components/icons/SettingsIcon'
import { ROUTES } from '@/routes'
import { useAuth } from '@/features/common/user'
import { TFlexComponentProps } from '@/components/Flex/types'
import { TUserRoles } from '@/types/roles'
import { ERoles } from '@/constants/profile'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Divider, ItemWrapper } from './ProfilePopover.styled'

export interface IProfilePopoverProps {
  name?: string
  phone?: string
  email?: string
  userRole?: TUserRoles
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
  name = 'John Johnson',
  email = 'john.johnson@example.com',
  userRole = 'manager',
}: IProfilePopoverProps): JSX.Element => {
  const { t } = useTranslation('user')
  const { setModal } = useModals()

  const router = useRouter()

  const { logoutAsync } = useAuth()

  const handleLogout = () => {
    if (userRole === 'agent') {
      setModal({ modalName: MODAL_NAMES.AGENT_LOGOUT, isOpen: true })
    } else {
      logoutAsync()
    }
  }

  const handleGoToSettings = () => {
    router.push(ROUTES.SETTINGS_ACCOUNT_MANAGEMENT)
  }

  return (
    <Flex direction="column" align="center" gap={30}>
      <Flex direction="column" align="center" gap={8}>
        <UserRoleIcon userRole={userRole} iconSize="28px" variant="medium" />
        <Flex direction="column" align="center">
          <Text variant="f4">{name}</Text>
          <Text variant="f6" color="main22">
            {t(`roles.${userRole}`)}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap={16}>
        {email && <PopoverMenuItem icon={<EmailIcon />} title={email} />}
        {userRole !== ERoles.AGENT && (
          <PopoverMenuItem
            icon={<SettingsIcon />}
            title={t('routing:settings')}
            onClick={handleGoToSettings}
            cursor="pointer"
          />
        )}
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
