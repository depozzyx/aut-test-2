import { useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import {
  selectFormDataForReview,
  asyncCreateCampaign,
} from '@/features/campaigns/store/create-campaign'
import { TCampaignTableType } from '@/features/campaigns/types'
import { Field } from './ReviewFields.styled'

type TProps = {
  type: TCampaignTableType
}

export const ReviewFields = ({ type }: TProps): JSX.Element | null => {
  const { t } = useTranslation('campaigns')
  const { setModal } = useModals()
  const { select, dispatch } = useRedux()
  const formDataForReview = select(selectFormDataForReview, shallowEqual)

  const handleBack = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_CAMPAIGN, isOpen: true })
  }

  const handleCreateCampaign = () => {
    dispatch(asyncCreateCampaign(type))
  }

  const agents = useMemo(() => {
    if (!formDataForReview) return
    if (formDataForReview.assignedAgentIds.length > 1) {
      return t('review-campaign.agents', {
        count: formDataForReview.assignedAgentIds.length,
      })
    }
    return `${formDataForReview.assignedAgentIds}`
  }, [formDataForReview?.assignedAgentIds])

  const leads = useMemo(() => {
    if (!formDataForReview) return
    if (formDataForReview.leadListIdsLabel.length > 1) {
      return t('review-campaign.leads', {
        count: formDataForReview.leadListIdsLabel.length,
      })
    }
    return `${formDataForReview.leadListIdsLabel}`
  }, [formDataForReview?.leadListIdsLabel])

  const leadStatuses = useMemo(() => {
    if (!formDataForReview) return
    if (formDataForReview.filterLeadStatuses.length > 1) {
      return t('review-campaign.lead-statuses', {
        count: formDataForReview.filterLeadStatuses.length,
      })
    }
    if (formDataForReview.filterLeadStatuses.length === 1) {
      return t('review-campaign.lead-status')
    }
    return 0
  }, [formDataForReview?.filterLeadStatuses])

  // const recycleRules = useMemo(() => {
  //   if (!formDataForReview) return
  //   if (formDataForReview.recycleRules.length > 1) {
  //     return t('review-campaign.recycle-rules', {
  //       count: formDataForReview.recycleRules.length,
  //     })
  //   }
  //   if (formDataForReview.recycleRules.length === 1) {
  //     return t('review-campaign.recycle-rule')
  //   }
  //   return 0
  // }, [formDataForReview?.recycleRules])
  //
  // if (!formDataForReview) {
  //   return null
  // }

  return (
    <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
      <Flex gap={24} direction="column" width="326px">
        <Field
          label={t('create-campaign.campaign-name')}
          value={formDataForReview?.name}
        />
        <Field label={t('create-campaign.agent-assignment')} value={agents} />
        <Field label={t('create-campaign.lead-selection')} value={leads} />
        <Field
          label={t('create-campaign.hold-time')}
          value={formDataForReview?.holdTime}
        />
        <Field label={t('create-campaign.mode-label')} value={formDataForReview?.mode} />
        <Field
          label={t('create-campaign.coefficient-label')}
          value={formDataForReview?.coefficient}
        />
        <Field label={t('create-campaign.lead-statuses-review')} value={leadStatuses} />
        {/* <Field label={t('create-campaign.recycle-rules')} value={recycleRules} /> */}
        <Field
          label={t('create-campaign.workHours-label')}
          value={formDataForReview?.workHours}
        />
      </Flex>
      <Flex align="center" justify="center" gap={24}>
        <OutlinedButton onClick={handleBack} width="236px">
          {t('review-campaign.back-btn')}
        </OutlinedButton>
        <FilledButton onClick={handleCreateCampaign} width="236px">
          {t('review-campaign.submit-btn')}
        </FilledButton>
      </Flex>
    </Flex>
  )
}
