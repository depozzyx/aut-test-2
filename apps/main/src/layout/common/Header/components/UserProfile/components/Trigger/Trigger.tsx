import { forwardRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { Avatar } from '@peiko/components/Avatar'
import avatarMock from '@/assets/img/avatar.png'
import { Text } from '@peiko/components/Text'
import { TUserRoles } from '@/types/entities/profile'

export interface ITriggerProps {
  name?: string
  userRole?: TUserRoles
  avatar?: string
}

export const Trigger = forwardRef<HTMLDivElement, ITriggerProps>(
  (
    { name = 'John J.', userRole = 'Manager', avatar = avatarMock.src, ...rest },
    ref,
  ): JSX.Element => {
    const { t } = useTranslation('user')

    return (
      <Flex
        ref={ref}
        padding="8px 16px"
        maxWidth={128}
        gap={8}
        cursor="pointer"
        {...rest}
      >
        <Avatar
          size={42}
          src={avatar}
          alt="avatar"
          styles={{ cursor: 'pointer !important' }}
        />
        <Flex direction="column" height="100%" align="center" justify="center">
          <Text variant="f8">{name}</Text>
          <Text variant="f10" color="main18" styles={{ fontWeight: 300 }}>
            {t(`roles.${userRole}`)}
          </Text>
        </Flex>
      </Flex>
    )
  },
)

Trigger.displayName = 'Trigger'
