import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Text } from '@peiko/components/Text'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useRedux } from '@/hooks/use-redux'
import { Card } from '@peiko/components/Card'
import { selectCurrentLogDetails } from '../../../../store/campaign-log'
import { TDHead, TD } from './DetailsLogModal.styled'

export const DetailsLogModal = (): JSX.Element | null => {
  const { t } = useTranslation('activity-log')
  const { select } = useRedux()
  const { modalState, resetModals } = useModals()

  const details = select(selectCurrentLogDetails)

  if (!details) return null

  const showModal =
    modalState?.modalName === MODAL_NAMES.CAMPAIGN_DETAILS_LOG && modalState.isOpen

  const title = (
    <Text styles={{ marginBottom: '4px' }}>
      {t('campaign.logs.campaign-details-info')}
    </Text>
  )

  const content = (
    <Card bgColor="overlay" fullWidth>
      <table>
        <tbody>
          {Object.entries(details).map(([key, value]) => (
            <tr key={key}>
              <TDHead>{key}:</TDHead>
              <TD>{value}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={resetModals}
      containerWidth="100%"
      maxWidth="576px"
    >
      {content}
    </ModalMessage>
  )
}
