import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'

type QuestionModalProps = {
  confirmHandler: () => void
  cancelHandler?: () => void
  title: string | React.ReactNode
  description?: string | React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
}

export const QuestionModal = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirmHandler,
  cancelHandler,
}: QuestionModalProps): JSX.Element => {
  const { modalState, resetModals } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.QUESTION_MODAL && modalState.isOpen

  const onCancel = () => {
    if (cancelHandler) {
      cancelHandler()
    } else {
      resetModals()
    }
  }
  const titleComponent = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      {typeof description === 'string' ? (
        <Text tag="span" variant="f2" color="main2">
          {title}
        </Text>
      ) : (
        title
      )}
    </Flex>
  )

  const actions = (
    <Flex width="100%" gap={24} styles={{ paddingTop: '48px' }}>
      <FilledButton onClick={confirmHandler} width="100%">
        {confirmLabel}
      </FilledButton>
      <OutlinedButton onClick={resetModals} width="100%">
        {cancelLabel}
      </OutlinedButton>
    </Flex>
  )

  const descriptionContent =
    typeof description === 'string' ? (
      <Text
        variant="f5"
        color="main5"
        styles={{ marginTop: '30px', textAlign: 'center' }}
      >
        {description}
      </Text>
    ) : (
      <div style={{ marginTop: '30px', textAlign: 'center' }}>{description}</div>
    )

  return (
    <ModalMessage
      title={titleComponent}
      open={showModal}
      onClose={onCancel}
      status="info"
      containerWidth="100%"
    >
      {description ? descriptionContent : null}
      {actions}
    </ModalMessage>
  )
}
