import React, { useCallback, useEffect, useRef, useState } from 'react'
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

import { selectSelectedCampaignId } from '@/features/campaigns/store/campaigns'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { coefficients, modes, workHours } from '@/constants/settings'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { hasArrayChanged } from '@/utils/array'
import { RecycleRules } from '@/features/campaigns/components/RecycleRules'
import { TRecycleRule } from '@/api-rest/campaigns/types'
import { createCampaignValidationSchema } from '@/utils/validation'
import {
  asyncGetUsersList,
  selectUsersOptions,
  selectUsersPagination,
} from '@/features/users/store/users'
import { asyncEditCampaign } from '../../../../../store/edit-campaign'
import { TCampaignTableType } from '../../../../../types'
import { useGetCampaignById } from '../../../../../hooks/use-getCampaignById'
import { CAMPAIGN_STATUSES, INITIAL_REQUEST_PARAMS_EDIT } from '../../../../../constants'
import { ERoles } from '../../../../../../../constants/profile'

type TProps = {
  type: TCampaignTableType
}

type TFormValues = {
  name: string
  assignedAgentIds: number[]
  leadListIds: number[]
  holdTime: number
  mode: string
  coefficient: number
  filterLeadStatuses: string[]
  recycleRules: TRecycleRule[]
  workHours?: string
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
      agentsPagination: selectUsersPagination,
      agentsOptions: selectUsersOptions,
    }),
    shallowEqual,
  )

  const { data } = useGetCampaignById()

  useEffect(() => {
    Promise.all([
      dispatch(asyncGetUsersList(ERoles.AGENT, INITIAL_REQUEST_PARAMS_EDIT)),
      dispatch(
        asyncGetLeadListCatalog({
          ...INITIAL_REQUEST_PARAMS_EDIT,
          withoutCampaigns: true,
          campaignId: campaignId && +campaignId,
        }),
      ),
    ])
  }, [])

  const leadStatuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
      assignedAgentIds: [],
      leadListIds: [],
      holdTime: 0,
      mode: '',
      coefficient: 0,
      filterLeadStatuses: [],
      recycleRules: [],
      workHours: workHours[0],
    },
    validationSchema: createCampaignValidationSchema,
    onSubmit: (formData) => {
      dispatch(asyncEditCampaign(formData, type))
    },
  })

  const [initialLeadListIds, setInitialLeadListIds] = useState<number[]>([])

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        assignedAgentIds: data?.assignedAgents,
        leadListIds: data?.leadLists,
        holdTime: data?.holdTime,
        mode: data?.mode,
        coefficient: data?.coefficient,
        filterLeadStatuses: data?.filterLeadStatuses,
        recycleRules: data?.recycleRules,
        workHours: data?.workHours || workHours[0],
      })
      if (data.status === CAMPAIGN_STATUSES.COMPLETE) {
        setInitialLeadListIds(data?.leadLists)
      }
    }
  }, [data])

  /** prevent to delete initial leads lists for completed campaign */
  useEffect(() => {
    if (data?.status === CAMPAIGN_STATUSES.COMPLETE && initialLeadListIds.length) {
      const missingInitialItems = initialLeadListIds.filter(
        (id) => !formik.values.leadListIds.includes(id),
      )

      if (missingInitialItems.length) {
        // console.debug(`missing ${missingInitialItems}`) //todo
        formik.setFieldValue(
          'leadListIds',
          Array.from(new Set([...formik.values.leadListIds, ...missingInitialItems])),
        )
      }
    }
  }, [formik.values.leadListIds, data, initialLeadListIds])

  useEffect(() => {
    if (!formik.values?.recycleRules?.length) {
      return
    }
    formik.values.recycleRules.forEach((rule) => {
      rule.status.forEach((status) => {
        if (!formik.values.filterLeadStatuses.includes(status)) {
          formik.setFieldValue('filterLeadStatuses', [
            ...formik.values.filterLeadStatuses,
            status,
          ])
        }
      })
    })
  }, [formik.values.recycleRules])

  const onLeadsScrollToBottom = useCallback(() => {
    const lastPage = leadsTotal === 0 ? 1 : Math.ceil(leadsTotal / (leadsLimit ?? 10))
    if (leadsPage < lastPage)
      dispatch(
        asyncGetLeadListCatalog(
          {
            page: leadsPage + 1,
            limit: leadsLimit,
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
        asyncGetUsersList(
          ERoles.AGENT,
          {
            page: agentsPage + 1,
            limit: agentsLimit,
          },
          true,
          true,
        ),
      )
    }
  }, [agentsPage, agentsLimit, agentsTotal])

  const isChanged = () =>
    data &&
    (data.name !== formik.values.name ||
      data.workHours !== formik.values.workHours ||
      hasArrayChanged(data.assignedAgents, formik.values.assignedAgentIds) ||
      hasArrayChanged(data.leadLists, formik.values.leadListIds) ||
      data.holdTime !== formik.values.holdTime ||
      data.mode !== formik.values.mode ||
      data.coefficient !== formik.values.coefficient ||
      JSON.stringify(data.recycleRules) !== JSON.stringify(formik.values.recycleRules) ||
      hasArrayChanged(data.filterLeadStatuses, formik.values.filterLeadStatuses))

  const isRecycleRulesInvalid = () =>
    formik.values.recycleRules?.length && !formik.values.recycleRules[0].status

  const handleFilterLeadStatusesChange = () => {
    setTimeout(() => formik.setTouched({ filterLeadStatuses: true }, true), 0)
  }

  const handleAssignedAgentIdsChange = () => {
    setTimeout(() => formik.setTouched({ assignedAgentIds: true }, true), 0)
  }

  const refLeftColumn = useRef<HTMLDivElement>(null)
  const refLeadStatuses = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    if (refLeftColumn.current && refLeadStatuses.current) {
      setHeight(refLeftColumn.current.clientHeight - refLeadStatuses.current.clientHeight)
    }
  }, [refLeftColumn.current?.clientHeight, refLeadStatuses.current?.clientHeight])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex direction="row" gap={48}>
          <Flex
            ref={refLeftColumn}
            direction="column"
            gap={16}
            maxWidth="424px"
            width="100%"
          >
            <FormikInput
              formik={formik}
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              size="s"
              name="name"
              label={{ label: t('edit-campaign.campaign-name') }}
              id="name"
              width={424}
              styles={{ padding: '0 14px' }}
            />
            <FormikMultiSelect
              formik={formik}
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              name="assignedAgentIds"
              label={{ label: t('edit-campaign.agent-assignment') }}
              width={424}
              size="s"
              options={agentsOptions}
              onMenuScrollToBottom={onAgentsScrollToBottom}
              isSearchable
              onChange={handleAssignedAgentIdsChange}
            />
            <FormikMultiSelect
              formik={formik}
              name="leadListIds"
              label={{ label: t('edit-campaign.lead-selection') }}
              size="s"
              width={424}
              options={leadListOptions}
              // isOptionDisabled={(option) =>
              //   data?.status === CAMPAIGN_STATUSES.COMPLETE &&
              //   initialLeadListIds.includes(+option.value)
              // }
              onMenuScrollToBottom={onLeadsScrollToBottom}
              isSearchable
            />
            <FormikInput
              formik={formik}
              type="number"
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              size="s"
              name="holdTime"
              placeholder={t('edit-campaign.hold-time-placeholder')}
              label={{ label: t('edit-campaign.hold-time') }}
              maxWidth="424px"
              width="100%"
              styles={{ padding: '0 14px' }}
            />
            <FormikSelect
              formik={formik}
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              options={modes.map((mode) => ({
                label: String(mode),
                value: String(mode),
              }))}
              width={424}
              name="mode"
              label={{ label: t('create-campaign.mode-label') }}
            />
            <FormikSelect
              formik={formik}
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              options={coefficients.map((number) => ({
                label: String(number),
                value: number,
              }))}
              width={424}
              name="coefficient"
              label={{ label: t('create-campaign.coefficient-label') }}
            />
            <FormikSelect
              formik={formik}
              disabled={data?.status === CAMPAIGN_STATUSES.COMPLETE}
              options={workHours.map((wh) => ({ label: wh, value: wh }))}
              width={424}
              name="workHours"
              label={{ label: t('create-campaign.workHours-label') }}
            />
          </Flex>
          <Flex direction="column" gap={48} maxWidth="424px" width="100%">
            <Flex ref={refLeadStatuses} direction="column" width="100%">
              <FormikMultiSelect
                formik={formik}
                name="filterLeadStatuses"
                label={{ label: t('edit-campaign.lead-statuses') }}
                size="s"
                width={424}
                options={leadStatuses.map(({ name: label, value }) => ({ label, value }))}
                isSearchable
                onChange={handleFilterLeadStatusesChange}
              />
            </Flex>
            <RecycleRules height={height} formik={formik} leadStatuses={leadStatuses} />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!isChanged() || isRecycleRulesInvalid() || !formik.isValid}
            width="202px"
          >
            {t('edit-campaign.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="202px" type="button">
            {t('edit-campaign.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
