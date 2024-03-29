import { FC } from 'react'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { StyledFilledChip } from './AuthNotification.styled'

export type TStatuses = 'success' | 'error' | 'info'

export interface IAuthNotificationProps {
  status: TStatuses
  title?: string
  message?: string
  onClose: () => void
}

export const AuthNotification: FC<IAuthNotificationProps> = ({
  status,
  title,
  message,
  onClose,
}) => (
  <StyledFilledChip status={status} size="m" onDelete={onClose}>
    <Flex direction="column">
      {title && (
        <Text variant="f9" color="main3">
          {title}
        </Text>
      )}
      {message && (
        <Text variant="f10" color="main19">
          {message}
        </Text>
      )}
    </Flex>
  </StyledFilledChip>
)
