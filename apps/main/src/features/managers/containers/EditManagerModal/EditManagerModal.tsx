import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { EditManagerForm } from '../EditManagerForm'

export const EditManagerModal = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { modalState, resetModals } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.EDIT_MANAGER && modalState.isOpen

  const title = <Text>{t('edit-manager.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <EditManagerForm />
    </ModalMessage>
  )
}
