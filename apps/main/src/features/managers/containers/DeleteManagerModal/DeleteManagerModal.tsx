import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { asyncRemoveManager, selectSelectedManager } from '../../store/managers'

export const DeleteManagerModal = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const { modalState, resetModals } = useModals()

  const selectedManager = select(selectSelectedManager)

  const showModal =
    modalState?.modalName === MODAL_NAMES.DELETE_MANAGER && modalState.isOpen

  const handleDelete = () => {
    if (!selectedManager) return
    dispatch(asyncRemoveManager(selectedManager.id))
  }

  const title = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      <Trans
        i18nKey="managers:delete-manager.title"
        components={{
          translate: <Text tag="span" variant="f2" />,
          value: <Text tag="span" variant="f2" color="main2" />,
        }}
        values={{
          managerName: selectedManager?.username || '',
        }}
      />
    </Flex>
  )

  const actions = (
    <Flex width="100%" gap={24} styles={{ paddingTop: '48px' }}>
      <FilledButton onClick={handleDelete} width="100%">
        {t('delete-manager.delete-btn')}
      </FilledButton>
      <OutlinedButton onClick={resetModals} width="100%">
        {t('delete-manager.cancel-btn')}
      </OutlinedButton>
    </Flex>
  )

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      status="info"
      containerWidth="100%"
    >
      {actions}
    </ModalMessage>
  )
}
