import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import useModals from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import { ReviewFields } from './components/ReviewFields'
import { reset } from '../../store/create-campaign'
import { TCampaignTableType } from '../../types'

type TProps = {
  type: TCampaignTableType
}

export const NewCampaignReviewModal = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { dispatch } = useRedux()
  const { resetModals } = useModals()

  const title = <Text>{t('review-campaign.title')}</Text>

  const handleClose = () => {
    resetModals()
    dispatch(reset())
  }

  return (
    <ModalMessage
      open
      title={title}
      onClose={handleClose}
      maxWidth="756px"
      containerWidth="100%"
      hideCloseButton
    >
      <ReviewFields type={type} />
    </ModalMessage>
  )
}
