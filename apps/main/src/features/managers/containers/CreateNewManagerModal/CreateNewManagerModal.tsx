import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { CreateNewManagerForm } from '@/features/managers/containers/CreateNewManagerForm'

export const CreateNewManagerModal = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { modalState, resetModals } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.CREATE_MANAGER && modalState.isOpen

  const title = <Text tag="span">{t('create-manager.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <CreateNewManagerForm />
    </ModalMessage>
  )
}
