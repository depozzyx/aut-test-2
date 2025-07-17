import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { EditAdminForm } from '../EditAdminForm'

export const EditAdminModal = (): JSX.Element => {
  const { t } = useTranslation('admins')
  const { modalState, resetModals } = useModals()

  const showModal = modalState?.modalName === MODAL_NAMES.EDIT_ADMIN && modalState.isOpen

  const title = <Text tag="span">{t('edit-admin.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <EditAdminForm />
    </ModalMessage>
  )
}
