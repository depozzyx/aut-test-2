import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'

type TProps = {
  title: string
  confirmAction: () => void
}

export const ConfirmDeleteModal = ({ title, confirmAction }: TProps): JSX.Element => {
  const { t } = useTranslation('modal-message')
  const { resetModals, modalState } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.DELETE_CONFIRMATION && modalState.isOpen

  const handleClose = () => resetModals()
  const handleConfirm = () => {
    confirmAction()
    resetModals()
  }

  return (
    <ModalMessage
      title={
        <Flex
          align="center"
          justify="center"
          width="330px"
          styles={{ textAlign: 'center' }}
        >
          <Text tag="span" variant="f2">
            {title}
          </Text>
        </Flex>
      }
      open={showModal}
      onClose={handleClose}
      status="info"
      containerWidth="100%"
    >
      <Flex width="100%" gap={24} styles={{ paddingTop: '48px' }}>
        <FilledButton onClick={handleConfirm} width="100%">
          {t('delete')}
        </FilledButton>
        <OutlinedButton onClick={handleClose} width="100%">
          {t('cancel')}
        </OutlinedButton>
      </Flex>
    </ModalMessage>
  )
}
