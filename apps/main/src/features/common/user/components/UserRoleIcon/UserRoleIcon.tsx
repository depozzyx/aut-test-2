import { USER_ROLES } from '@/constants/roles'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { UserWithMicro } from '@peiko/components/icons/UserWithMicro'
import { UserWithTie } from '@peiko/components/icons/UserWithTie'
import { IconWrapper, TVariantSize } from './UserRoleIcon.styled'

interface IUserRoleIconProps {
  userRole: string
  iconSize?: string
  color?: keyof TDefaultPalette
  variant?: TVariantSize
  borderRadius?: string
  bgColor?: keyof TDefaultPalette
}

export const UserRoleIcon = ({
  userRole,
  iconSize,
  color = 'base',
  ...rest
}: IUserRoleIconProps): JSX.Element | null => {
  const roleIcon =
    userRole === USER_ROLES.AGENT ? (
      <UserWithMicro color={color} width={iconSize} height={iconSize} />
    ) : (
      <UserWithTie color={color} width={iconSize} height={iconSize} />
    )

  return <IconWrapper {...rest}>{roleIcon}</IconWrapper>
}
