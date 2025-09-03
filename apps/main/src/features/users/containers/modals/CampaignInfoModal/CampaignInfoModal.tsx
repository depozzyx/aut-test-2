import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { selectAssignedCampaignsInfo } from '@/features/agents/store/agents'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { InfoField } from './components/InfoField'

export const CampaignInfoModal = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select } = useRedux()
  const { modalState, resetModals } = useModals()

  const assignedCampaign = select(selectAssignedCampaignsInfo, shallowEqual)

  const showModal =
    modalState?.modalName === MODAL_NAMES.CAMPAIGN_INFO && modalState.isOpen

  const content = useMemo(
    () => (
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24} direction="column" width="326px">
          <InfoField
            label={t('campaign-info.campaign-id')}
            value={assignedCampaign?.id}
          />
          <InfoField
            label={t('campaign-info.campaign-name')}
            value={assignedCampaign?.name}
          />
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('campaign-info.close')}
          </OutlinedButton>
        </Flex>
      </Flex>
    ),
    [assignedCampaign],
  )

  return (
    <ModalMessage
      title={t('campaign-info.title')}
      open={showModal}
      onClose={resetModals}
      status="info"
      containerWidth="100%"
    >
      {content}
    </ModalMessage>
  )
}
