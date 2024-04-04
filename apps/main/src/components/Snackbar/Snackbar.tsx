import { FC } from 'react'

import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TStatuses } from '@/features/common/notifications'
import { StyledFilledChip } from './Snackbar.styled'

export interface ISnackbarProps {
  status: TStatuses
  title?: string
  message?: string
  onClose: () => void
  maxWidth?: string
}

export const Snackbar: FC<ISnackbarProps> = ({
  status,
  title,
  message,
  onClose,
  maxWidth = '552px',
  children,
}) => {
  const defaultContent = (
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
  )

  return (
    <StyledFilledChip status={status} maxWidth={maxWidth} size="m" onDelete={onClose}>
      {children || defaultContent}
    </StyledFilledChip>
  )
}
