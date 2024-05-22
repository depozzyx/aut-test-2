import { useMemo } from 'react'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import {
  selectFormDataForReview,
  reset,
  asyncCreateCampaign,
} from '@/features/campaigns/store/create-campaign'
import { useCallTime } from '@/features/campaigns/hooks/use-callTime'
import { useCallFrequency } from '@/features/campaigns/hooks/use-callFrequency'
import { TGeneratedCallTime } from '@/features/campaigns/constants'
import { TCampaignTableType } from '@/features/campaigns/types'
import { Field } from './ReviewFields.styled'

type TProps = {
  type: TCampaignTableType
}

export const ReviewFields = ({ type }: TProps): JSX.Element | null => {
  const { t } = useTranslation('campaigns')
  const { setModal } = useModals()
  const { select, dispatch } = useRedux()
  const formDataForReview = select(selectFormDataForReview)

  const { getCallTimeLabel } = useCallTime()
  const { getCallFrequencyLabel } = useCallFrequency()

  const handleBack = () => {
    dispatch(reset())
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }

  const handleCreateCampaign = () => {
    dispatch(asyncCreateCampaign(type))
  }

  const agents = useMemo(() => {
    if (!formDataForReview) return
    if (formDataForReview.assignedAgentIds.length > 1) {
      return t('review-campaign.agents', {
        count: formDataForReview.assignedAgentIds.length + 1,
      })
    }
    return `${formDataForReview.assignedAgentIds}`
  }, [formDataForReview?.assignedAgentIds])

  const leads = useMemo(() => {
    if (!formDataForReview) return
    if (formDataForReview.leadListIdsLabel.length > 1) {
      return t('review-campaign.leads', {
        count: formDataForReview.leadListIdsLabel.length + 1,
      })
    }
    return `${formDataForReview.leadListIdsLabel}`
  }, [formDataForReview?.leadListIdsLabel])

  if (!formDataForReview) {
    return null
  }

  return (
    <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
      <Flex gap={24} direction="column" width="326px">
        <Field
          label={t('create-campaign.campaign-name')}
          value={formDataForReview.name}
        />
        <Field label={t('create-campaign.agent-assignment')} value={agents} />
        <Field label={t('create-campaign.lead-selection')} value={leads} />
        <Field
          label={t('create-campaign.call-frequency')}
          value={getCallFrequencyLabel(formDataForReview.intensity)}
        />
        <Field
          label={t('create-campaign.time-for-calls')}
          value={getCallTimeLabel(
            formDataForReview.preferredCallTime as TGeneratedCallTime,
          )}
        />
      </Flex>
      <Flex align="center" justify="center" gap={24}>
        <OutlinedButton onClick={handleCreateCampaign} width="236px">
          {t('review-campaign.submit-btn')}
        </OutlinedButton>
        <FilledButton onClick={handleBack} width="236px">
          {t('review-campaign.back-btn')}
        </FilledButton>
      </Flex>
    </Flex>
  )
}
