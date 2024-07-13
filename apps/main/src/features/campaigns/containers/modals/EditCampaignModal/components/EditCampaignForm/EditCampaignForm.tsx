import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/use-redux'
import { createStructuredSelector } from 'reselect'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { Flex } from '@/components/Flex'
import {
  asyncGetLeadListCatalog,
  selectLeadListCatalogAsOptions,
  selectLeadListPagination,
} from '@/features/leads/store/lead-list'

import {
  asyncGetAgentsList,
  selectAgentsOptions,
  selectAgentsPagination,
} from '@/features/agents/store/agents'
import { asyncEditCampaign } from '../../../../../store/edit-campaign'
import { TCampaignTableType } from '../../../../../types'
import { createCampaignValidationSchema } from '../../../../../utils/validationSchema'
import { useGetCampaignById } from '../../../../../hooks/use-getCampaignById'
import { INITIAL_REQUEST_PARAMS } from '../../../../../constants'

type TProps = {
  type: TCampaignTableType
}

type TFormValues = {
  name: string
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
  } = select(
    createStructuredSelector({
      leadsPagination: selectLeadListPagination,
      leadListOptions: selectLeadListCatalogAsOptions,
      agentsPagination: selectAgentsPagination,
      agentsOptions: selectAgentsOptions,
    }),
    shallowEqual,
  )

  const { data } = useGetCampaignById()

  useEffect(() => {
    dispatch(asyncGetLeadListCatalog(INITIAL_REQUEST_PARAMS))
  }, [])

  useEffect(() => {
    dispatch(asyncGetAgentsList(INITIAL_REQUEST_PARAMS))
  }, [])

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
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

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
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
