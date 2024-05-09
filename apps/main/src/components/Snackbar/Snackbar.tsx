import { FC, useEffect, useState } from 'react'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TStatuses } from '@/features/common/notifications'
import { useTimeoutFn } from 'react-use'
import { StyledFilledChip } from './Snackbar.styled'

export interface ISnackbarProps {
  status: TStatuses
  title?: string
  message?: string
  onClose: () => void
  maxWidth?: string
  withAnimation?: boolean
}

export const Snackbar: FC<ISnackbarProps> = ({
  status,
  title,
  message,
  onClose,
  maxWidth = '552px',
  withAnimation,
  children,
}) => {
  const [slideOut, setSlideOut] = useState(false)

  const [, cancel, reset] = useTimeoutFn(() => {
    setSlideOut(true)
    setTimeout(onClose, 500)
  }, 5000)

  useEffect(() => {
    reset()
    return cancel
  }, [children, status])

  const defaultContent = (
    <Flex direction="column">
      {title && (
        <Text variant="f8" color="main3">
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
    <StyledFilledChip
      status={status}
      maxWidth={maxWidth}
      size="m"
      onDelete={onClose}
      withAnimation={withAnimation}
      slideOut={slideOut}
    >
      {children || defaultContent}
    </StyledFilledChip>
  )
}
