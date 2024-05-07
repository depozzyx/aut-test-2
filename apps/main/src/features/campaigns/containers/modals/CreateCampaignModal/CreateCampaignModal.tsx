import useTranslation from 'next-translate/useTranslation'
import useModals from '@/features/common/modals/hooks/use-modals'
import { Text } from '@peiko/components/Text'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { CreateCampaignForm } from './components/CreateCampaignForm'

export const CreateCampaignModal = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()

  const title = <Text>{t('create-campaign.title')}</Text>

  return (
    <ModalMessage
      open
      title={title}
      onClose={resetModals}
      maxWidth="756px"
      containerWidth="100%"
    >
      <CreateCampaignForm />
    </ModalMessage>
  )
}
