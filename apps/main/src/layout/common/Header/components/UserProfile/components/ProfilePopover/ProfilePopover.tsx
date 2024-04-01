import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Avatar } from '@peiko/components/Avatar'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import avatarMock from '@/assets/img/avatar.png'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { PhoneIcon } from '@peiko/components/icons/PhoneIcon'
import { LogoutIcon } from '@peiko/components/icons/LogoutIcon'
import { SettingsIcon } from '@peiko/components/icons/SettingsIcon'
import { ROUTES } from '@/routes'
import { useAuth } from '@/features/common/user'
import { TFlexComponentProps } from '@/components/Flex/types'
import { Divider, ItemWrapper } from './ProfilePopover.styled'

export interface IProfilePopoverProps {
  name?: string
  phone?: string
  email?: string
  role?: string
  avatar?: string
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
    <Text>{title}</Text>
  </ItemWrapper>
)

export const ProfilePopover = (props: IProfilePopoverProps): JSX.Element => {
  const {
    name = 'John Johnson',
    phone = '(207) 555-0119',
    email = 'john.johnson@example.com',
    role = 'Manager',
    avatar = avatarMock.src,
  } = props

  const router = useRouter()

  const { logoutAsync } = useAuth()

  const handleLogout = () => {
    logoutAsync()
  }

  const handleGoToSettings = () => {
    router.push(ROUTES.SETTINGS)
  }

  return (
    <Flex direction="column" align="center" gap={48}>
      <Flex direction="column" align="center" gap={8}>
        <Avatar size={64} src={avatar} alt="avatar" />
        <Flex direction="column" align="center">
          <Text variant="f4">{name}</Text>
          <Text variant="f6" color="main18">
            {role}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap={16}>
        <PopoverMenuItem icon={<PhoneIcon />} title={phone} />
        <PopoverMenuItem icon={<EmailIcon />} title={email} />
        <PopoverMenuItem
          icon={<SettingsIcon />}
          title="Settings"
          onClick={handleGoToSettings}
          cursor="pointer"
        />
        <Divider />
        <PopoverMenuItem
          icon={<LogoutIcon color="main5" />}
          title="Logout"
          onClick={handleLogout}
          cursor="pointer"
        />
      </Flex>
    </Flex>
  )
}
