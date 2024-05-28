import { forwardRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TUserRoles } from '@/types/roles'
import { UserRoleIcon } from '@/features/common/user/components/UserRoleIcon'

export interface ITriggerProps {
  name?: string
  userRole?: TUserRoles
}

export const Trigger = forwardRef<HTMLDivElement, ITriggerProps>(
  ({ name = 'John J.', userRole = 'manager', ...rest }, ref): JSX.Element => {
    const { t } = useTranslation('user')

    return (
      <Flex ref={ref} padding="8px 16px" gap={8} cursor="pointer" {...rest}>
        <UserRoleIcon userRole={userRole} />
        <Flex direction="column" height="100%" justify="center">
          <Text variant="f8">{name}</Text>
          <Text variant="f10" color="main22" styles={{ fontWeight: 300 }}>
            {t(`roles.${userRole}`)}
          </Text>
        </Flex>
      </Flex>
    )
  },
)

Trigger.displayName = 'Trigger'
