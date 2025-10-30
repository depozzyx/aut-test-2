import React, { useEffect } from 'react'

import useTranslation from 'next-translate/useTranslation'

import { useRedux } from '@/hooks/use-redux'

import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { Flex } from '@/components/Flex'

import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { coefficients, modes, workHours } from '@/constants/settings'
import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { TCampaignById } from '@/api-rest/campaigns/types'
import { AgentsFormikSelect } from '@/features/common/FormInputs/AgentsMultiSelect/AgentsFormikSelect'
import { AgentsGroupsSelect } from '@/features/common/FormInputs/AgentsGroupsSelect/AgentsGroupsFormikSelect'

import { TFormik } from '@peiko/types/formik'
import { disabledEditStatuses } from '../../types'

export const CampaignGeneralPage = ({
  formik,
  campaign,
}: {
  formik: TFormik
  campaign: TCampaignById
}): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { dispatch, select } = useRedux()

  const leadStatuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="20px 0 0 0" width="100%">
        <Flex direction="row" gap={32} width="100%">
          <Flex direction="column" gap={16} width="100%">
            <FormikInput
              formik={formik}
              disabled={disabledEditStatuses.includes(campaign?.status)}
              size="s"
              name="name"
              label={{ label: t('edit-campaign.campaign-name') }}
              id="name"
              styles={{ padding: '0 14px' }}
            />
            <FormikInput
              formik={formik}
              type="number"
              disabled={disabledEditStatuses.includes(campaign?.status)}
              size="s"
              name="holdTime"
              placeholder={t('edit-campaign.hold-time-placeholder')}
              label={{ label: t('edit-campaign.hold-time') }}
              width="100%"
              styles={{ padding: '0 14px' }}
            />
            <FormikSelect
              formik={formik}
              disabled={disabledEditStatuses.includes(campaign?.status)}
              options={modes.map((mode) => ({
                label: String(mode),
                value: String(mode),
              }))}
              name="mode"
              label={{ label: t('create-campaign.mode-label') }}
              width="100%"
            />
            <FormikSelect
              formik={formik}
              disabled={disabledEditStatuses.includes(campaign?.status)}
              options={coefficients.map((number) => ({
                label: String(number),
                value: number,
              }))}
              name="coefficient"
              label={{ label: t('create-campaign.coefficient-label') }}
              width="100%"
            />
            <FormikSelect
              formik={formik}
              disabled={disabledEditStatuses.includes(campaign?.status)}
              options={workHours.map((wh) => ({ label: wh, value: wh }))}
              width="100%"
              name="workHours"
              label={{ label: t('create-campaign.workHours-label') }}
            />
            <FormikMultiSelect
              disabled={disabledEditStatuses.includes(campaign?.status)}
              formik={formik}
              name="filterLeadStatuses"
              emitValues
              label={{ label: t('edit-campaign.lead-statuses') }}
              size="s"
              options={leadStatuses.map(({ name: label, value }) => ({ label, value }))}
              isSearchable
              width="100%"
            />
          </Flex>
          <Flex direction="column" gap={16} width="100%">
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
          </Flex>
        </Flex>
      </Flex>
    </form>
  )
}
