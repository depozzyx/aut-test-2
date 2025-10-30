import React, { useEffect } from 'react'

import { useRedux } from '@/hooks/use-redux'

import { Flex } from '@/components/Flex'

import { selectLeadStatuses } from '@/features/leads/store/leads'

import { TFormik } from '@peiko/types/formik'
import { RecycleRulesTable } from '@/features/campaigns/components/RecycleRules/RecycleRulesTable'
import { TCampaignById } from '@/api-rest/campaigns/types'
import { disabledEditStatuses } from '../../types'
import { TEditCampaignFormValues } from '../../hooks/useCampaignEdit'

export const CampaignRecyclePage = ({
  formik,
  campaign,
}: {
  formik: TFormik<TEditCampaignFormValues>
  campaign: TCampaignById
}): JSX.Element => {
  const { select } = useRedux()

  const readOnly = disabledEditStatuses.includes(campaign.status)
  const leadStatuses = select(selectLeadStatuses)
  useEffect(() => {
    if (!formik.values?.recycleRules?.length) {
      return
    }
    formik.values.recycleRules.forEach((rule: any) => {
      rule.status.forEach((status: any) => {
        if (!formik.values.filterLeadStatuses.includes(status)) {
          formik.setFieldValue('filterLeadStatuses', [
            ...formik.values.filterLeadStatuses,
            status,
          ])
        }
      })
    })
  }, [formik.values.recycleRules])

  return (
    <Flex direction="column" align="center" margin="20px 0 0 0">
      <RecycleRulesTable
        formik={formik}
        readOnly={readOnly}
        statuses={leadStatuses.map(({ value, name: label }) => ({ label, value }))}
      />
    </Flex>
  )
}
