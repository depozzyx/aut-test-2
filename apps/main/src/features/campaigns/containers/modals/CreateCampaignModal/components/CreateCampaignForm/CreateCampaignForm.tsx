import React, { useEffect, FC, useState, useRef, useLayoutEffect } from 'react'
import { useFormik } from 'formik'
import { shallowEqual, useStore } from 'react-redux'

import useTranslation from 'next-translate/useTranslation'

import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useModals } from '@/features/common/modals/hooks/use-modals'

import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'

import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { modes, coefficients, campaignSettingKeys, workHours } from '@/constants/settings'
import { TFormik } from '@peiko/types/formik'
import { useSettings } from '@/features/settings/hooks/useSettings'
import {
  reset,
  reviewFormData,
  selectFormDataForReview,
} from '@/features/campaigns/store/create-campaign'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Select } from '@peiko/components/inputs/Select/Select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { apiCampaigns } from '@/api-rest/campaigns'

import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'

import { RecycleRules } from '@/features/campaigns/components/RecycleRules'
import { TAgent, TRecycleRule } from '@/api-rest/campaigns/types'
import { createCampaignValidationSchema } from '@/utils/validation'

import { AgentsFormikSelect } from '@/features/common/FormInputs/AgentsMultiSelect/AgentsFormikSelect'
import { LeadListsSelect } from '@/features/common/FormInputs/LeadListsMultiSelect/LeadListsMultiSelect'
import { AgentsGroupsSelect } from '@/features/common/FormInputs/AgentsGroupsSelect/AgentsGroupsFormikSelect'
import { selectAgentGroupsList } from '@/features/agent-groups/store/agent-groups'
import { TAgentGroup } from '@/api-rest/users/groups.types'
import { useCampaignLoader } from '@/features/campaigns/hooks/useCampaignLoader'

type Props = {
  setSelectedCampaignId: (id: string) => void
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

export const CreateCampaignForm: FC<Props> = ({ setSelectedCampaignId }: Props) => {
  const { t } = useTranslation('campaigns')
  const { resetModals, modalState } = useModals()
  const { select, dispatch } = useRedux()
  const formDataForReview = select(selectFormDataForReview, shallowEqual)
  const store = useStore()

  const {
    options: campaignOptions,
    loadMore: loadMoreCampaigns,
    setSearch: setSearchCampaigns,
  } = useCampaignLoader()

  const agentGroups = select(selectAgentGroupsList)

  const [oldAgentGroups, setOldAgentGroups] = useState<TAgentGroup[]>([])

  const { getSettingsAsync } = useSettings()

  const leadStatuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const formik = useFormik<TFormValues>({
    initialValues: {
      name: '',
      assignedAgent: [],
      agentGroups: [],
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
        reviewFormData({
          ...data,
          leadListIds: leadList.map((item) => item.value),
          agentGroupIds: agentGroups.map((item) => item.value),
          assignedAgentIds: assignedAgent.map((item) => item.value),
        }),
      )
    },
  })

  const getSettings = async (form: TFormik) => {
    const { data } = await getSettingsAsync([
      campaignSettingKeys.mode,
      campaignSettingKeys.coefficient,
      campaignSettingKeys.workHours,
    ])
    await form.setFieldValue('mode', data.campaignMode)
    await form.setFieldValue('coefficient', parseInt(data.campaignCoefficient, 10))
    if (data.campaignWorkHours)
      await form.setFieldValue('workHours', data.campaignWorkHours)
  }

  useEffect(() => {
    if (!formDataForReview && modalState?.isOpen) {
      getSettings(formik)
    }
  }, [formDataForReview])

  useEffect(() => {
    if (
      formDataForReview &&
      modalState?.isOpen &&
      modalState?.modalName === MODAL_NAMES.CREATE_CAMPAIGN
    ) {
      const {
        name,
        mode,
        coefficient,
        holdTime,
        leadListIds,
        filterLeadStatuses,
        recycleRules,
        workHours,
      } = formDataForReview
      formik.setFieldValue('name', name)
      formik.setFieldValue('mode', mode)
      formik.setFieldValue('coefficient', coefficient)
      formik.setFieldValue('holdTime', holdTime)
      formik.setFieldValue('workHours', workHours)
      const assignedAgentIds = store.getState().createCampaign.formData?.assignedAgentIds
      if (assignedAgentIds.length) {
        formik.setFieldValue('assignedAgentIds', assignedAgentIds)
      }
      formik.setFieldValue('leadListIds', leadListIds)
      formik.setFieldValue('filterLeadStatuses', filterLeadStatuses)
      formik.setFieldValue('recycleRules', recycleRules)
    } else {
      dispatch(reset())
    }
  }, [formDataForReview])

  const handleCancel = () => {
    dispatch(reset())
    resetModals()
  }

  const handleCampaignSelect = async (option: SingleValue<TSelectOption>) => {
    setSelectedCampaignId(option?.value ? String(option?.value) : '')
    if (option?.value) {
      const id = String(option?.value)
      const {
        data: { data: campaign },
      } = await apiCampaigns.getCampaignById(id)

      if (campaign) {
        ;(['mode', 'coefficient', 'holdTime', 'workHours'] as const).forEach((field) => {
          if (campaign[field] !== undefined) {
            formik.setFieldValue(field, campaign[field])
          }
        })

        if (campaign?.assignedAgents?.length) {
          const newAssignedAgent = campaign.assignedAgents.map((agent) => ({
            value: agent.id,
            label: agent.username,
          }))
          await formik.setFieldValue('assignedAgent', newAssignedAgent)
        }

        await formik.setFieldValue('filterLeadStatuses', campaign.filterLeadStatuses)
        await formik.setFieldValue('recycleRules', campaign.recycleRules)
        if (campaign.agentGroups.length) {
          await formik.setFieldValue(
            'agentGroups',
            campaign.agentGroups.map((group) => ({
              value: group.id,
              label: group.name,
            })),
          )
        }
      }
    } else if (option?.label === '-') {
      formik.setFieldValue('holdTime', 0)
      formik.setFieldValue('assignedAgentIds', [])
      await getSettings(formik)
    }
  }

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

  const isRecycleRulesInvalid = () =>
    formik.values.recycleRules?.length && !formik.values.recycleRules[0].status

  const refLeftColumn = useRef<HTMLDivElement>(null)
  const refLeadStatuses = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(608)

  useLayoutEffect(() => {
    if (refLeftColumn.current) {
      setHeight(refLeftColumn.current.clientHeight)
    }
  }, [refLeftColumn.current?.clientHeight])

  const handleFilterLeadStatusesChange = () => {
    setTimeout(() => formik.setTouched({ filterLeadStatuses: true }, true), 0)
  }

  useEffect(() => {
    const currentAgents = formik.values.assignedAgent
    const addedGroups = formik.values.agentGroups
      .filter((g) => !oldAgentGroups.some((og) => og.id === g.value))
      .map((g) => agentGroups.find((ag) => ag.id === g.value))

    const addedAgents = addedGroups
      .flatMap((group) => group?.agents ?? [])
      .reduce((acc, agent) => {
        if (
          !acc.find((a) => a.id === agent.id) &&
          !currentAgents.find((a) => a.value === agent.id)
        )
          acc.push(agent)
        return acc
      }, [] as TAgent[])

    const deletedGroups = oldAgentGroups.filter(
      (og) => !formik.values.agentGroups.some((g) => g.value === og.id),
    )
    const agents = oldAgentGroups
      .filter((og) => !deletedGroups.some((dg) => dg.id === og.id))
      .flatMap((group) => group?.agents ?? [])

    const deletedAgents = deletedGroups
      .flatMap((group) => group.agents)
      .reduce((acc, agent) => {
        if (agent && !agents.find((a) => a.id === agent.id)) acc.add(agent.id)
        return acc
      }, new Set())

    const newAgents = [
      ...formik.values.assignedAgent.filter((agent) => !deletedAgents.has(agent.value)),
      ...addedAgents.map((agent) => ({ value: agent.id, label: agent.username })),
    ]

    formik.setFieldValue('assignedAgent', newAgents)
    setOldAgentGroups(
      oldAgentGroups
        .filter((og) => !deletedGroups.some((g) => g.id === og.id))
        .concat(addedGroups.filter((g): g is TAgentGroup => !!g)),
    )
  }, [formik.values.agentGroups])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <Flex width="100%" direction="column" align="center" gap={48} margin="20px 0 0 0">
        <Flex direction="row" gap={32}>
          <Flex
            ref={refLeftColumn}
            maxWidth="424px"
            width="100%"
            direction="column"
            gap={16}
          >
            <Select
              name="campaignId"
              onChange={handleCampaignSelect}
              placeholder={t('create-campaign.select-campaign-placeholder')}
              label={{ label: t('create-campaign.select-campaign-label') }}
              options={campaignOptions}
              onMenuScrollToBottom={loadMoreCampaigns}
              onInputChange={setSearchCampaigns}
              maxMenuHeight={200}
              width="100%"
              isSearchable
            />
            <FormikInput
              size="s"
              name="name"
              label={{ label: t('create-campaign.campaign-name') }}
              formik={formik}
              maxWidth="424px"
              width="100%"
              styles={{ padding: '0 14px' }}
            />
            <AgentsGroupsSelect
              formik={formik}
              name="agentGroups"
              label={t('create-campaign.agent-groups')}
            />
            <AgentsFormikSelect
              formik={formik}
              name="assignedAgent"
              label={t('create-campaign.agent-assignment')}
            />
            <LeadListsSelect
              formik={formik}
              name="leadList"
              label={t('create-campaign.lead-selection')}
            />
            <FormikInput
              size="s"
              type="number"
              name="holdTime"
              placeholder={t('create-campaign.hold-time-placeholder')}
              label={{ label: t('create-campaign.hold-time') }}
              formik={formik}
              maxWidth="424px"
              width="100%"
              styles={{ padding: '0 14px' }}
            />
            <FormikSelect
              formik={formik}
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
                label={{ label: t('create-campaign.lead-statuses') }}
                size="s"
                width={432}
                options={leadStatuses.map(({ name: label, value }) => ({ label, value }))}
                isSearchable
                emitValues
                onChange={handleFilterLeadStatusesChange}
              />
            </Flex>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <RecycleRules formik={formik} leadStatuses={leadStatuses} />
            </div>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton onClick={handleCancel} width="202px">
            {t('create-campaign.cancel')}
          </OutlinedButton>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || isRecycleRulesInvalid() || !formik.dirty}
            width="202px"
          >
            {t('create-campaign.review')}
          </FilledButton>
        </Flex>
      </Flex>
    </form>
  )
}
