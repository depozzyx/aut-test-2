import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import useModals from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { EditAgentForm } from './components/EditAgentForm'

export const EditAgentModal = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { modalState, resetModals } = useModals()

  const showModal = modalState?.modalName === MODAL_NAMES.EDIT_AGENT && modalState.isOpen

  const title = <Text>{t('edit-agent.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <EditAgentForm />
    </ModalMessage>
  )
}
