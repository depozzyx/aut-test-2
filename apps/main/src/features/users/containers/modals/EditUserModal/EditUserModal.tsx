import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { EditUserForm } from './components/EditUserForm'
import { ERoles } from '../../../../../constants/profile'
import { roleUserTranslationKey } from '../../../constants'

export const EditUserModal = ({ role }: { role: ERoles }): JSX.Element => {
  const { t } = useTranslation(
    roleUserTranslationKey[role as ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN],
  )
  const { modalState, resetModals } = useModals()

  const showModal = modalState?.modalName === MODAL_NAMES.EDIT_USER && modalState.isOpen

  const title = <Text tag="span">{t('edit.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      <EditUserForm role={role} />
    </ModalMessage>
  )
}
