import useTranslation from 'next-translate/useTranslation'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Text } from '@peiko/components/Text'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { CreateCampaignForm } from './components/CreateCampaignForm'

export const CreateCampaignModal = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN && modalState.isOpen

  const title = <Text>{t('create-campaign.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      // ToDo: check why modall resset called twicelly
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={() => {}}
      maxWidth="756px"
      containerWidth="100%"
    >
      <CreateCampaignForm />
    </ModalMessage>
  )
}
