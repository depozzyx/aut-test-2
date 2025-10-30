import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useFormik } from 'formik'

import useTranslation from 'next-translate/useTranslation'

import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { Flex } from '@/components/Flex'

import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { coefficients, modes, workHours } from '@/constants/settings'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { hasArrayChanged } from '@/utils/array'
import { RecycleRules } from '@/features/campaigns/components/RecycleRules'
import { TRecycleRule } from '@/api-rest/campaigns/types'
import { createCampaignValidationSchema } from '@/utils/validation'
import { TSelectOption } from '@/components/MutliSelect/types'
import { AgentsFormikSelect } from '@/features/common/FormInputs/AgentsMultiSelect/AgentsFormikSelect'
import { LeadListsSelect } from '@/features/common/FormInputs/LeadListsMultiSelect/LeadListsMultiSelect'
import { asyncEditCampaign } from '@/features/campaigns/store/edit-campaign'
import { TCampaignTableType } from '@/features/campaigns/types'
import { useGetCampaignById } from '@/features/campaigns/hooks/use-getCampaignById'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'
import { AgentsGroupsSelect } from '@/features/common/FormInputs/AgentsGroupsSelect/AgentsGroupsFormikSelect'
import { ERoles } from '@/constants/profile'
import { TUser } from '@/api-rest/users/types'
import { getGroupsUsers } from '@/features/users/store/users'

type TProps = {
  campaignId: number
  type: TCampaignTableType
}

type TFormValues = {
  name: string
  agentGroups: TSelectOption<number>[]
  assignedAgent: TSelectOption<number>[]
  leadList: TSelectOption<number>[]
  holdTime: number
  mode: string
  coefficient: number
  filterLeadStatuses: string[]
  recycleRules: TRecycleRule[]
  workHours?: string
}

export const EditCampaignForm = ({ campaignId, type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { dispatch, select } = useRedux()

  const { data } = useGetCampaignById(campaignId)

  const leadStatuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
      agentGroups: [],
      assignedAgent: [],
      leadList: [],
      holdTime: 0,
      mode: '',
      coefficient: 0,
      filterLeadStatuses: [],
      recycleRules: [],
      workHours: workHours[0],
    },
    validationSchema: createCampaignValidationSchema,
    onSubmit: (formData) => {
      const { leadList, assignedAgent, agentGroups, ...data } = formData
      dispatch(
        asyncEditCampaign(
          campaignId,
          {
            ...data,
            agentGroupIds: (agentGroups ?? []).map((item) => item.value),
            leadListIds: leadList.map((item) => item.value),
            assignedAgentIds: assignedAgent.map((item) => item.value),
          },
          type,
        ),
      )
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        assignedAgent: data?.assignedAgents,
        agentGroups: data?.agentGroups,
        leadList: data?.leadLists,
        holdTime: data?.holdTime,
        mode: data?.mode,
        coefficient: data?.coefficient,
        filterLeadStatuses: data?.filterLeadStatuses,
        recycleRules: data?.recycleRules,
        workHours: data?.workHours || workHours[0],
      })
    }
  }, [data])

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

  useEffect(() => {
    getGroupsUsers(
      ERoles.AGENT,
      formik.values.agentGroups.map((g) => g.value),
    ).then((agents: TUser[]) => {
      formik.setFieldValue('assignedAgent', [
        ...formik.values.assignedAgent,
        ...(
          agents.filter(
            (agent) => !formik.values.assignedAgent.some((a) => a.value === agent.id),
          ) || []
        ).map((agent: TUser) => ({ value: agent.id, label: agent.username })),
      ])
    })
  }, [formik.values.agentGroups])

  const isChanged = () =>
    data &&
    (data.name !== formik.values.name ||
      data.workHours !== formik.values.workHours ||
      hasArrayChanged(
        data.assignedAgents.map((a) => a.value as number),
        formik.values.assignedAgent.map((a) => a.value as number),
      ) ||
      hasArrayChanged(
        data.leadLists.map((a) => a.value as number),
        formik.values.leadList.map((a) => a.value as number),
      ) ||
      hasArrayChanged(
        data.agentGroups.map((a) => a.value as number),
        formik.values.agentGroups.map((a) => a.value as number),
      ) ||
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

  const refLeftColumn = useRef<HTMLDivElement>(null)
  const refLeadStatuses = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(540)

  useLayoutEffect(() => {
    if (refLeftColumn.current) {
      setHeight(refLeftColumn.current.clientHeight)
    }
  }, [refLeftColumn.current?.clientHeight])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="20px 0 0 0">
        <Flex direction="row" gap={32}>
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
            <AgentsGroupsSelect
              formik={formik}
              name="agentGroups"
              label={t('edit-campaign.agent-groups')}
            />
            <AgentsFormikSelect
              formik={formik}
              name="assignedAgent"
              label={t('edit-campaign.agent-assignment')}
            />
            <LeadListsSelect
              formik={formik}
              name="leadList"
              label={t('edit-campaign.lead-selection')}
              campaignId={campaignId}
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
          <Flex
            ref={refLeadStatuses}
            direction="column"
            gap={48}
            maxWidth="432px"
            width="100%"
            height={height}
          >
            <Flex direction="column" width="100%">
              <FormikMultiSelect
                formik={formik}
                name="filterLeadStatuses"
                emitValues
                label={{ label: t('edit-campaign.lead-statuses') }}
                size="s"
                width={432}
                options={leadStatuses.map(({ name: label, value }) => ({ label, value }))}
                isSearchable
                onChange={handleFilterLeadStatusesChange}
              />
            </Flex>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <RecycleRules formik={formik} leadStatuses={leadStatuses} />
            </div>
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
