import { FC } from 'react'

import { Box } from '@peiko/components/Box'
import { Message, StyledFilledChip, Title } from './AuthNotification.styled'

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
  <StyledFilledChip
    status={status}
    size="m"
    styles={{
      width: '100%',
      height: '48px',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    onDelete={onClose}
  >
    <Box styles={{ display: 'flex', flexDirection: 'column' }}>
      {title && <Title>{title}</Title>}
      {message && <Message>{message}</Message>}
    </Box>
  </StyledFilledChip>
)
