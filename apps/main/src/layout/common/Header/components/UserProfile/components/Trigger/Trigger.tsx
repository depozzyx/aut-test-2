import { Flex } from '@/components/Flex'
import { Avatar } from '@peiko/components/Avatar'
import avatarMock from '@/assets/img/avatar.png'
import { Text } from '@peiko/components/Text'
import { forwardRef } from 'react'

export interface ITriggerProps {
  name?: string
  role?: string
  avatar?: string
}

export const Trigger = forwardRef<HTMLDivElement, ITriggerProps>(
  (
    { name = 'John J.', role = 'Manager', avatar = avatarMock.src, ...rest },
    ref,
  ): JSX.Element => (
    <Flex ref={ref} padding="8px 16px" maxWidth={128} gap={8} cursor="pointer" {...rest}>
      <Avatar
        size={42}
        src={avatar}
        alt="avatar"
        styles={{ cursor: 'pointer !important' }}
      />
      <Flex direction="column" height="100%" align="center" justify="center">
        <Text variant="f8">{name}</Text>
        <Text variant="f10" color="main18" styles={{ fontWeight: 300 }}>
          {role}
        </Text>
      </Flex>
    </Flex>
  ),
)

Trigger.displayName = 'Trigger'
