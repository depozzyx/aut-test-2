import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { asyncEditCampaign } from '@/features/campaigns/store/edit-campaign'
import { TCampaignTableType } from '@/features/campaigns/types'
import { useCallTime } from '@/features/campaigns/hooks/use-callTime'
import { useCallFrequency } from '@/features/campaigns/hooks/use-callFrequency'
import { createCampaignValidationSchema } from '@/features/campaigns/containers/modals/CreateCampaignModal/components/CreateCampaignForm/validationSchema'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { createStructuredSelector } from 'reselect'
import {
  asyncGetLeadListCatalog,
  selectIsLoadingLeadsCatalog,
  selectLeadListCatalogAsOptions,
  selectLeadListPagination,
} from '@/features/leads/store/lead-list'
import { shallowEqual } from 'react-redux'
import { useEffect } from 'react'
import {
  asyncGetAgentsList,
  selectAgentsOptions,
  selectAgentsPagination,
  selectIsLoadingAgents,
} from '@/features/agents/store/agents'
import { Loader } from '@peiko/components/loaders/Loader'
import { useGetCampaignById } from '@/features/campaigns/hooks/use-getCampaignById'
import {
  TGeneratedCallFrequency,
  TGeneratedCallTime,
} from '@/features/campaigns/constants'

type TProps = {
  type: TCampaignTableType
}

type TFormValues = {
  name: string
  intensity: TGeneratedCallFrequency
  intensityPerAgent: TGeneratedCallFrequency
  preferredCallTime: TGeneratedCallTime
  assignedAgentIds: number[]
  leadListIds: number[]
}

export const EditCampaignForm = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { dispatch, select } = useRedux()

  const {
    leadsPagination: { page: leadsPage, limit: leadsLimit, total: leadsTotal },
    leadListOptions,
    agentsPagination: { page: agentsPage, limit: agentsLimit, total: agentsTotal },
    agentsOptions,
    isAgentLoading,
    isLeadsLoading,
  } = select(
    createStructuredSelector({
      leadsPagination: selectLeadListPagination,
      leadListOptions: selectLeadListCatalogAsOptions,
      agentsPagination: selectAgentsPagination,
      agentsOptions: selectAgentsOptions,
      isAgentLoading: selectIsLoadingAgents,
      isLeadsLoading: selectIsLoadingLeadsCatalog,
    }),
    shallowEqual,
  )

  const { data, isLoading } = useGetCampaignById()

  useEffect(() => {
    dispatch(
      asyncGetLeadListCatalog({ page: leadsPage, limit: leadsLimit, orderBy: 'ASC' }),
    )
  }, [])

  useEffect(() => {
    dispatch(asyncGetAgentsList({ page: agentsPage, limit: agentsLimit, orderBy: 'ASC' }))
  }, [])

  const { callTimeOptions } = useCallTime()
  const { callFrequencyOptions } = useCallFrequency()

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
      intensity: callFrequencyOptions[0].value as TGeneratedCallFrequency,
      intensityPerAgent: callFrequencyOptions[0].value as TGeneratedCallFrequency,
      preferredCallTime: callTimeOptions[0].value,
      assignedAgentIds: [],
      leadListIds: [],
    },
    validationSchema: createCampaignValidationSchema,
    onSubmit: (formData) => {
      dispatch(asyncEditCampaign(formData, type))
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        intensity: data.intensity,
        intensityPerAgent: data?.intensityPerAgent,
        preferredCallTime: data?.preferredCallTime,
        assignedAgentIds: data?.assignedAgents,
        leadListIds: data?.leadLists,
      })
    }
  }, [data])

  const onLeadsScrollToBottom = () => {
    const lastPage = leadsTotal === 0 ? 1 : Math.ceil(leadsTotal / (leadsLimit ?? 15))
    if (leadsPage < lastPage)
      dispatch(
        asyncGetLeadListCatalog({
          page: leadsPage + 1,
          limit: leadsLimit,
          orderBy: 'ASC',
        }),
      )
  }

  const onAgentsScrollToBottom = () => {
    const lastPage = agentsTotal === 0 ? 1 : Math.ceil(agentsTotal / (agentsLimit ?? 15))
    if (agentsPage < lastPage)
      dispatch(
        asyncGetAgentsList(
          {
            page: agentsPage + 1,
            limit: agentsLimit,
            orderBy: 'ASC',
          },
          true,
        ),
      )
  }

  if (isLoading || isAgentLoading || isLeadsLoading)
    return <Loader styles={{ height: '278px', marginTop: '40px' }} />

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikInput
              size="s"
              name="name"
              label={{ label: t('edit-campaign.campaign-name') }}
              id="name"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikMultiSelect
              formik={formik}
              name="assignedAgentIds"
              label={{ label: t('edit-campaign.agent-assignment') }}
              width={326}
              size="s"
              options={agentsOptions}
              onMenuScrollToBottom={onAgentsScrollToBottom}
            />
            <FormikMultiSelect
              formik={formik}
              name="leadListIds"
              label={{ label: t('edit-campaign.lead-selection') }}
              size="s"
              width={326}
              options={leadListOptions}
              onMenuScrollToBottom={onLeadsScrollToBottom}
            />
          </Flex>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikSelect
              formik={formik}
              name="intensity"
              label={{ label: t('edit-campaign.call-frequency') }}
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
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="236px"
          >
            {t('edit-campaign.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit-campaign.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
