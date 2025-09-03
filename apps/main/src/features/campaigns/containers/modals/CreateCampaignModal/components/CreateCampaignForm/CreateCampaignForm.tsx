import React, { useEffect, useCallback, FC, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { shallowEqual, useStore } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import useTranslation from 'next-translate/useTranslation'
import debounce from 'lodash/debounce'

import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import {
  asyncGetLeadListCatalog,
  selectLeadListPagination,
  selectLeadListCatalogAsOptions,
  reset as resetLeadsList,
} from '@/features/leads/store/lead-list'
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
import { TCampaignOption } from '@/features/campaigns/hooks/use-campaignNameFilter'
import { Select } from '@peiko/components/inputs/Select/Select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TPagination } from '@/types/entities/pagination'
import { handleRestError } from '@/features/common/error'
import { TCampaign } from '@/features/campaigns/types'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import {
  INITIAL_REQUEST_PARAMS_CREATE,
  PAGINATION_REQUEST_TIME,
} from '@/features/campaigns/constants'
import { RecycleRules } from '@/features/campaigns/components/RecycleRules'
import { TRecycleRule } from '@/api-rest/campaigns/types'
import { createCampaignValidationSchema } from '@/utils/validation'
import {
  asyncGetUsersList,
  selectUsersOptions,
  selectUsersPagination,
  reset as resetUsersList,
  setUsersList,
} from '@/features/users/store/users'
import { ERoles } from '../../../../../../../constants/profile'
import { TUser } from '../../../../../../../api/rest/users/types'

type Props = {
  selectedCampaignId: string
  setSelectedCampaignId: (id: string) => void
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

export const CreateCampaignForm: FC<Props> = ({
  selectedCampaignId,
  setSelectedCampaignId,
}: Props) => {
  const { t } = useTranslation('campaigns')
  const { resetModals, modalState } = useModals()
  const { select, dispatch } = useRedux()
  const formDataForReview = select(selectFormDataForReview, shallowEqual)
  const store = useStore()

  const [campaignOptions, setCampaignOptions] = useState<TCampaignOption[]>([
    { label: '-', value: '' },
  ])
  const [campaignsPagination, setCampaignsPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })

  const getAndSetCampaignParams = async () => {
    try {
      const { data } = await apiCampaigns.getCampaignList({
        page: campaignsPagination.page,
        limit: campaignsPagination.limit,
      })
      setCampaignOptions((prev) => [
        ...prev,
        ...data.data.map((campaign: TCampaign) => ({
          label: campaign.name,
          value: campaign.id,
        })),
      ])
      setCampaignsPagination(data.pagination)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }
  useEffect(() => {
    getAndSetCampaignParams()
  }, [campaignsPagination.page, campaignsPagination.limit])

  const loadMoreCampaigns = useCallback(() => {
    const nextPage = campaignsPagination.page + 1
    const lastPage = Math.ceil(
      campaignsPagination.total / (campaignsPagination.limit ?? 10),
    )
    if (campaignsPagination.page < lastPage) {
      setCampaignsPagination((prev) => ({ ...prev, page: nextPage }))
    }
  }, [campaignsPagination])

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

  const { getSettingsAsync } = useSettings()

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
      dispatch(reviewFormData(formData))
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
      dispatch(resetLeadsList())
      dispatch(resetUsersList())
      Promise.all([
        dispatch(asyncGetUsersList(ERoles.AGENT, INITIAL_REQUEST_PARAMS_CREATE)),
        dispatch(
          asyncGetLeadListCatalog({
            ...INITIAL_REQUEST_PARAMS_CREATE,
            withoutCampaigns: true,
          }),
        ),
      ])
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
        ;['mode', 'coefficient', 'holdTime', 'workHours'].forEach((field) => {
          if (campaign[field]) {
            formik.setFieldValue(field, campaign[field])
          }
        })

        if (campaign?.assignedAgents?.length) {
          const newAssignedAgentIds = campaign.assignedAgents.map(
            (agent: TUser) => agent.id,
          )
          const newOptions: TUser[] = []
          campaign.assignedAgents.forEach((agent: TUser) => {
            if (!agentsOptions.some((option) => option.value === agent.id)) {
              newOptions.push(agent)
            }
          })
          if (newOptions.length) {
            dispatch(setUsersList({ data: newOptions, append: true }))
          }
          await formik.setFieldValue('assignedAgentIds', newAssignedAgentIds)
          await formik.setFieldValue('filterLeadStatuses', campaign.filterLeadStatuses)
          await formik.setFieldValue('recycleRules', campaign.recycleRules)
        }
      }
    } else if (option?.label === '-') {
      formik.setFieldValue('holdTime', 0)
      formik.setFieldValue('assignedAgentIds', [])
      await getSettings(formik)
    }
  }

  const onLeadsScrollToBottom = useCallback(
    debounce(() => {
      const lastPage = leadsTotal === 0 ? 1 : Math.ceil(leadsTotal / (leadsLimit ?? 10))
      if (leadsPage < lastPage)
        dispatch(
          asyncGetLeadListCatalog(
            {
              page: leadsPage + 1,
              limit: leadsLimit,
              withoutCampaigns: true,
            },
            true,
            true,
          ),
        )
    }, PAGINATION_REQUEST_TIME),
    [leadsPage, leadsLimit, leadsTotal],
  )

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

  const onAgentsScrollToBottom = useCallback(
    debounce(() => {
      const lastPage =
        agentsTotal === 0 ? 1 : Math.ceil(agentsTotal / (agentsLimit ?? 10))
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
    }, PAGINATION_REQUEST_TIME),
    [agentsPage, agentsLimit, agentsTotal],
  )

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
    <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <Flex width="100%" direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex direction="row" gap={48}>
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
              options={campaignOptions.filter((v) =>
                String(selectedCampaignId) === '' ? v.label !== '-' : true,
              )}
              value={
                campaignOptions.find(
                  (i) => String(i.value) === String(selectedCampaignId),
                )?.value
              }
              onMenuScrollToBottom={loadMoreCampaigns}
              maxMenuHeight={200}
              width="100%"
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
            <FormikMultiSelect
              formik={formik}
              name="assignedAgentIds"
              label={{ label: t('create-campaign.agent-assignment') }}
              width={424}
              size="s"
              options={agentsOptions}
              onChange={handleAssignedAgentIdsChange}
              onMenuScrollToBottom={onAgentsScrollToBottom}
              isSearchable
            />
            <FormikMultiSelect
              formik={formik}
              name="leadListIds"
              label={{ label: t('create-campaign.lead-selection') }}
              size="s"
              width={424}
              options={leadListOptions}
              onMenuScrollToBottom={onLeadsScrollToBottom}
              isSearchable
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
          <Flex direction="column" gap={48} maxWidth="424px" width="100%">
            <Flex ref={refLeadStatuses} direction="column" width="100%">
              <FormikMultiSelect
                formik={formik}
                name="filterLeadStatuses"
                label={{ label: t('create-campaign.lead-statuses') }}
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
