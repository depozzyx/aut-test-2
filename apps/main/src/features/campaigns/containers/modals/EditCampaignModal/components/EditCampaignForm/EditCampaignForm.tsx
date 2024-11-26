import React, { useCallback, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useFormik } from 'formik'
import { createStructuredSelector } from 'reselect'
import useTranslation from 'next-translate/useTranslation'

import { useRedux } from '@/hooks/use-redux'
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
import { ORDER_BY } from '@/constants/orderBy'
import { selectSelectedCampaignId } from '@/features/campaigns/store/campaigns'
import { asyncEditCampaign } from '../../../../../store/edit-campaign'
import { TCampaignTableType } from '../../../../../types'
import { createCampaignValidationSchema } from '../../../../../utils/validationSchema'
import { useGetCampaignById } from '../../../../../hooks/use-getCampaignById'
import { INITIAL_REQUEST_PARAMS_EDIT } from '../../../../../constants'

type TProps = {
  type: TCampaignTableType
}

type TFormValues = {
  name: string
  assignedAgentIds: number[]
  leadListIds: number[]
  holdTime: number
}

export const EditCampaignForm = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { dispatch, select } = useRedux()
  const campaignId = select(selectSelectedCampaignId)

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
    Promise.all([
      dispatch(asyncGetAgentsList(INITIAL_REQUEST_PARAMS_EDIT)),
      dispatch(
        asyncGetLeadListCatalog({
          ...INITIAL_REQUEST_PARAMS_EDIT,
          withoutCampaigns: true,
          campaignId: campaignId && +campaignId,
        }),
      ),
    ])
  }, [])

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
      assignedAgentIds: [],
      leadListIds: [],
      holdTime: 0,
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
        holdTime: data?.holdTime,
      })
    }
  }, [data])

  const onLeadsScrollToBottom = useCallback(() => {
    const lastPage = leadsTotal === 0 ? 1 : Math.ceil(leadsTotal / (leadsLimit ?? 10))
    if (leadsPage < lastPage)
      dispatch(
        asyncGetLeadListCatalog(
          {
            page: leadsPage + 1,
            limit: leadsLimit,
            orderBy: ORDER_BY.DESC,
            withoutCampaigns: true,
            campaignId: campaignId && +campaignId,
          },
          true,
          true,
        ),
      )
  }, [leadsPage, leadsTotal, leadsLimit])

  const onAgentsScrollToBottom = useCallback(() => {
    const lastPage = agentsTotal === 0 ? 1 : Math.ceil(agentsTotal / (agentsLimit ?? 10))
    if (agentsPage < lastPage) {
      dispatch(
        asyncGetAgentsList(
          {
            page: agentsPage + 1,
            limit: agentsLimit,
            orderBy: ORDER_BY.DESC,
          },
          true,
          true,
        ),
      )
    }
  }, [agentsPage, agentsLimit, agentsTotal])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex direction="column" gap={16} maxWidth="424px" width="100%">
          <FormikInput
            size="s"
            name="name"
            label={{ label: t('edit-campaign.campaign-name') }}
            id="name"
            formik={formik}
            width={424}
            styles={{ padding: '0 14px' }}
          />
          <FormikMultiSelect
            formik={formik}
            name="assignedAgentIds"
            label={{ label: t('edit-campaign.agent-assignment') }}
            width={424}
            size="s"
            options={agentsOptions}
            onMenuScrollToBottom={onAgentsScrollToBottom}
            isSearchable
          />
          <FormikMultiSelect
            formik={formik}
            name="leadListIds"
            label={{ label: t('edit-campaign.lead-selection') }}
            size="s"
            width={424}
            options={leadListOptions}
            onMenuScrollToBottom={onLeadsScrollToBottom}
            isSearchable
          />
          <FormikInput
            size="s"
            name="holdTime"
            placeholder={t('edit-campaign.hold-time-placeholder')}
            label={{ label: t('edit-campaign.hold-time') }}
            formik={formik}
            maxWidth="424px"
            width="100%"
            styles={{ padding: '0 14px' }}
          />
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="202px"
          >
            {t('edit-campaign.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="202px">
            {t('edit-campaign.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
