import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { TCampaignTableType } from '@/features/campaigns/types'
import { EditCampaignForm } from './components/EditCampaignForm'

type TProps = {
  type: TCampaignTableType
}

export const EditCampaignModal = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { modalState, resetModals } = useModals()

  const showModal =
    modalState?.modalName === MODAL_NAMES.EDIT_CAMPAIGN && modalState.isOpen

  const title = <Text>{t('edit-campaign.title')}</Text>

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      maxWidth="612px"
      containerWidth="100%"
    >
      <EditCampaignForm type={type} />
    </ModalMessage>
  )
}
