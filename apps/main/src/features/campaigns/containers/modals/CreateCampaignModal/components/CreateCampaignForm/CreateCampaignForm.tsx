import React, { useEffect, useCallback, FC } from 'react'
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
import {
  asyncGetAgentsList,
  selectAgentsPagination,
  selectAgentsOptions,
  reset as resetAgentsList,
  setAgentsList,
} from '@/features/agents/store/agents'
import { ORDER_BY } from '@/constants/orderBy'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { modes, coefficients, campaignSettingKeys } from '@/constants/settings'
import { TFormik } from '@peiko/types/formik'
import { useSettings } from '@/features/settings/hooks/useSettings'
import {
  reset,
  reviewFormData,
  selectFormDataForReview,
} from '@/features/campaigns/store/create-campaign'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useCampaignNameFilter } from '@/features/campaigns/hooks/use-campaignNameFilter'
import { Select } from '@peiko/components/inputs/Select/Select'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { apiCampaigns } from '@/api-rest/campaigns'
import { TAgent } from '@/api-rest/agents/types'
import { createCampaignValidationSchema } from '../../../../../utils/validationSchema'
import {
  INITIAL_REQUEST_PARAMS_CREATE,
  PAGINATION_REQUEST_TIME,
} from '../../../../../constants'

type Props = {
  selectedCampaignId: string
  setSelectedCampaignId: (id: string) => void
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

  const { campaignOptions, loadMoreCampaigns } = useCampaignNameFilter('list', true)

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

  const { getSettingsAsync } = useSettings()

  const formik = useFormik({
    initialValues: {
      name: '',
      holdTime: 0,
      mode: '',
      coefficient: '',
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
    ])
    await form.setFieldValue('mode', data.campaignMode)
    await form.setFieldValue('coefficient', data.campaignCoefficient)
  }

  useEffect(() => {
    if (!formDataForReview) {
      getSettings(formik)
      dispatch(resetLeadsList())
      dispatch(resetAgentsList())
      Promise.all([
        dispatch(asyncGetAgentsList(INITIAL_REQUEST_PARAMS_CREATE)),
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
      const { name, mode, coefficient, holdTime, leadListIds } = formDataForReview
      formik.setFieldValue('name', name)
      formik.setFieldValue('mode', mode)
      formik.setFieldValue('coefficient', coefficient)
      formik.setFieldValue('holdTime', holdTime)
      const assignedAgentIds = store.getState().createCampaign.formData?.assignedAgentIds
      if (assignedAgentIds.length) {
        formik.setFieldValue('assignedAgentIds', assignedAgentIds)
      }
      formik.setFieldValue('leadListIds', leadListIds)
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
        ;['mode', 'coefficient', 'holdTime'].forEach((field) => {
          if (campaign[field]) {
            formik.setFieldValue(field, campaign[field])
          }
        })

        if (campaign?.assignedAgents?.length) {
          const newAssignedAgentIds = campaign.assignedAgents.map(
            (agent: TAgent) => agent.id,
          )
          const newOptions: TAgent[] = []
          campaign.assignedAgents.forEach((agent: TAgent) => {
            if (!agentsOptions.some((option) => option.value === agent.id)) {
              newOptions.push(agent)
            }
          })
          if (newOptions.length) {
            dispatch(setAgentsList({ data: newOptions, append: true }))
          }
          await formik.setFieldValue('assignedAgentIds', newAssignedAgentIds)
        }
      }
    } else if (option?.label === '-') {
      formik.setFieldValue('holdTime', '')
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
              orderBy: ORDER_BY.DESC,
              withoutCampaigns: true,
            },
            true,
            true,
          ),
        )
    }, PAGINATION_REQUEST_TIME),
    [leadsPage, leadsLimit, leadsTotal],
  )

  const onAgentsScrollToBottom = useCallback(
    debounce(() => {
      const lastPage =
        agentsTotal === 0 ? 1 : Math.ceil(agentsTotal / (agentsLimit ?? 10))
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
    }, PAGINATION_REQUEST_TIME),
    [agentsPage, agentsLimit, agentsTotal],
  )

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: '100%' }}>
      <Flex width="100%" direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex maxWidth="424px" width="100%" direction="column" gap={16}>
          <Select
            name="campaignId"
            onChange={handleCampaignSelect}
            placeholder={t('create-campaign.select-campaign-placeholder')}
            label={{ label: t('create-campaign.select-campaign-label') }}
            options={campaignOptions.filter((v) =>
              String(selectedCampaignId) === '' ? v.label !== '-' : true,
            )}
            value={
              campaignOptions.find((i) => String(i.value) === String(selectedCampaignId))
                ?.value
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
              value: String(number),
            }))}
            width={424}
            name="coefficient"
            label={{ label: t('create-campaign.coefficient-label') }}
          />
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton onClick={handleCancel} width="202px">
            {t('create-campaign.cancel')}
          </OutlinedButton>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="202px"
          >
            {t('create-campaign.review')}
          </FilledButton>
        </Flex>
      </Flex>
    </form>
  )
}
