import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { selectCreateCampaignFormData } from '@/features/campaigns/store/create-campaign'
import { Field } from './ReviewFields.styled'

export const ReviewFields = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals, setModal } = useModals()
  const { select } = useRedux()
  const formData = select(selectCreateCampaignFormData)

  const handleBack = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }

  return (
    <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
      <Flex gap={24} direction="column" width="326px">
        <Field label={t('create-campaign.campaign-name')} value={formData.name} />
        <Field
          label={t('create-campaign.agent-assignment')}
          value={formData.assignedAgentIds}
        />
        <Field
          label={t('create-campaign.lead-selection')}
          value={formData.leadSelection}
        />
        <Field label={t('create-campaign.creation-date')} value={formData.creationDate} />
        <Field
          label={t('create-campaign.scenario-setup')}
          value={formData.scenarioSetup}
        />
        <Field
          label={t('create-campaign.call-frequency')}
          value={formData.callFrequency}
        />
        <Field label={t('create-campaign.time-for-calls')} value={formData.callTime} />
      </Flex>
      <Flex align="center" justify="center" gap={24}>
        <OutlinedButton onClick={handleBack} width="236px">
          {t('common:submit')}
        </OutlinedButton>
        <FilledButton onClick={resetModals} width="236px">
          {t('common:back')}
        </FilledButton>
      </Flex>
    </Flex>
  )
}
