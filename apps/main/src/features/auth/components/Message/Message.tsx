import { FC } from 'react'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { SuccessIcon } from '@peiko/components/icons/SuccessIcon'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { Text } from '@peiko/components/Text'
import useTranslation from 'next-translate/useTranslation'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Flex } from '@/components/Flex'
import { Container, Close } from './Message.styled'

interface IMessageProps {
  status: 'success' | 'error'
  message: string
  buttonText: string
  buttonAction: () => void
  onClose: () => void
}

export const Message: FC<IMessageProps> = ({
  status,
  message,
  buttonText,
  buttonAction,
  onClose,
}) => {
  const { t } = useTranslation('common')

  const statusIcon =
    status === 'success' ? <SuccessIcon size="l" /> : <ErrorIcon size="l" />

  const statusTitle = status === 'success' ? t('statuses.success') : t('statuses.error')

  return (
    <Container>
      {onClose && (
        <Close onClick={onClose} iconColor="main5" size="s">
          <CloseIcon size="xs" />
        </Close>
      )}
      <Flex direction="column" align="center">
        {statusIcon}
        <Flex direction="column" align="center" gap={16} styles={{ marginTop: '40px' }}>
          <Text variant="f2">{statusTitle}</Text>
          <Text variant="f7">{message}</Text>
        </Flex>
        <FilledButton width="236px" styles={{ marginTop: '48px' }} onClick={buttonAction}>
          {buttonText}
        </FilledButton>
      </Flex>
    </Container>
  )
}
