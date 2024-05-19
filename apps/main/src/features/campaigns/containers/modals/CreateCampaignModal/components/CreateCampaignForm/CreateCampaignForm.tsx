import { useEffect } from 'react'
import { useFormik } from 'formik'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { useCallTime } from '@/features/campaigns/hooks/use-callTime'
import { useCallFrequency } from '@/features/campaigns/hooks/use-callFrequency'
import {
  asyncGetLeadListCatalog,
  selectLeadListPagination,
  selectLeadListCatalogAsOptions,
  selectIsLoadingLeadsGroups,
} from '@/features/leads/store/lead-list'
import { Loader } from '@peiko/components/loaders/Loader'
import { TGeneratedCallTime } from '@/features/campaigns/constants'
import { reviewFormData } from '@/features/campaigns/store/create-campaign'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import {
  asyncGetAgentsList,
  selectAgentsOptions,
  selectIsLoadingAgents,
} from '@/features/agents/store/agents'
import { createCampaignValidationSchema } from './validationSchema'

export const CreateCampaignForm = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()

  const {
    pagination: { page, limit },
    leadListOptions,
    agentsOptions,
    isLoadingAgents,
    isLoadingLeadsGroups,
  } = select(
    createStructuredSelector({
      pagination: selectLeadListPagination,
      leadListOptions: selectLeadListCatalogAsOptions,
      agentsOptions: selectAgentsOptions,
      isLoadingAgents: selectIsLoadingAgents,
      isLoadingLeadsGroups: selectIsLoadingLeadsGroups,
    }),
    shallowEqual,
  )

  const { callTimeOptions } = useCallTime()
  const { callFrequencyOptions } = useCallFrequency()

  const formik = useFormik({
    initialValues: {
      name: '',
      intensity: callFrequencyOptions[0].value,
      intensityPerAgent: callFrequencyOptions[0].value,
      preferredCallTime: callTimeOptions[0].value as TGeneratedCallTime,
    },
    validationSchema: createCampaignValidationSchema,
    onSubmit: (formData) => {
      dispatch(reviewFormData(formData))
    },
  })

  useEffect(() => {
    dispatch(asyncGetLeadListCatalog({ page, limit, orderBy: 'ASC' }))
  }, [])

  useEffect(() => {
    dispatch(asyncGetAgentsList({ page, limit, orderBy: 'ASC' }))
  }, [])

  if (isLoadingAgents || isLoadingLeadsGroups)
    return <Loader styles={{ height: '278px', marginTop: '40px' }} />

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <Flex width="100%" direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex width="100%" gap={24}>
          <Flex maxWidth="326px" width="100%" direction="column" gap={16}>
            <FormikInput
              size="s"
              name="name"
              label={{ label: t('create-campaign.campaign-name') }}
              id="name"
              formik={formik}
              maxWidth="326px"
              width="100%"
              styles={{ padding: '0 14px' }}
            />
            <FormikMultiSelect
              formik={formik}
              name="assignedAgentIds"
              label={{ label: t('create-campaign.agent-assignment') }}
              width={326}
              size="s"
              options={agentsOptions}
            />
            <FormikMultiSelect
              formik={formik}
              name="leadListIds"
              label={{ label: t('create-campaign.lead-selection') }}
              size="s"
              width={326}
              options={leadListOptions}
            />
          </Flex>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikSelect
              formik={formik}
              name="intensity"
              label={{ label: t('create-campaign.call-frequency') }}
              width={326}
              options={callFrequencyOptions}
              onChange={(option) => {
                if (!option) return
                formik.setFieldValue('intensity', option.value)
                formik.setFieldValue('intensityPerAgent', option.value)
              }}
            />
            <FormikSelect
              formik={formik}
              name="preferredCallTime"
              label={{ label: t('create-campaign.time-for-calls') }}
              width={326}
              options={callTimeOptions}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('create-campaign.cancel')}
          </OutlinedButton>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="236px"
          >
            {t('create-campaign.review')}
          </FilledButton>
        </Flex>
      </Flex>
    </form>
  )
}
