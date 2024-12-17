import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { CreateNewAgentForm } from '@/features/agents/containers/modals/CreateNewAgentModal/components'

export const CreateNewAgentModal = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { modalState, resetModals } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.CREATE_AGENT && modalState.isOpen

  const title = <Text tag="span">{t('create-agent.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <CreateNewAgentForm />
    </ModalMessage>
  )
}
