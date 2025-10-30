import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { ERoles } from '@/constants/profile'
import { roleUserTranslationKey } from '@/features/users/constants'
import { CreateNewUserForm } from './components'

export const CreateNewUserModal = ({ role }: { role: ERoles }): JSX.Element => {
  const { t } = useTranslation(
    roleUserTranslationKey[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN],
  )
  const { modalState, resetModals } = useModals()

  const showModal = modalState?.modalName === MODAL_NAMES.CREATE_USER && modalState.isOpen

  const title = <Text tag="span">{t('create.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <CreateNewUserForm role={role} />
    </ModalMessage>
  )
}
