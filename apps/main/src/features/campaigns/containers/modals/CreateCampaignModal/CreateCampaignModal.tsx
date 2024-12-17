import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { reset } from '@/features/campaigns/store/create-campaign'
import { useRedux } from '@/hooks/use-redux'
import { CreateCampaignForm } from './components/CreateCampaignForm'

export const CreateCampaignModal = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { dispatch } = useRedux()

  const handleClose = () => {
    dispatch(reset())
    resetModals()
  }

  const title = t('create-campaign.title')

  return (
    <ModalMessage
      open
      title={title}
      onClose={handleClose}
      maxWidth="612px"
      containerWidth="100%"
    >
      <CreateCampaignForm />
    </ModalMessage>
  )
}
