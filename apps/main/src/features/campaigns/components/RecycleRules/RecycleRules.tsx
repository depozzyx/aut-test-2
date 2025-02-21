import React, { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { FilledButton } from '@peiko/components/buttons/FilledButton/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon/PlusIcon'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TFormik } from '@peiko/types/formik'
import { recycleRuleSchema } from '@/features/campaigns/utils/validationSchema'
import { TLeadStatusData } from '@/api-rest/leads/types'
import { RecycleRuleRow } from './RecycleRuleRow'

interface RecycleRule {
  status: string
  delay: string
  attempts: number
}

type Props = {
  formik: TFormik
  leadStatuses: TLeadStatusData[]
}

export const RecycleRules: FC<Props> = ({ formik, leadStatuses }: Props) => {
  const { t } = useTranslation('campaigns')

  const { values, setFieldValue } = formik

  const handleAddRule = async () => {
    await setFieldValue(
      'recycleRules',
      [{ status: null, delay: '00:15', attempts: 1 }, ...values.recycleRules],
      false,
    )
  }

  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (
      !leadStatuses.length ||
      leadStatuses.length === formik.values.recycleRules.length
    ) {
      return setDisabled(true)
    }
    const firstRule = formik.values.recycleRules[0]

    const checkRuleValidation = async () => {
      const res = await recycleRuleSchema.isValid(firstRule)
      setDisabled(!res)
    }
    if (!firstRule) {
      setDisabled(false)
    } else {
      try {
        checkRuleValidation()
      } catch (e) {
        setDisabled(true)
      }
    }
  }, [formik.values.recycleRules, leadStatuses])

  return (
    <Flex maxWidth="424px" width="100%" direction="column">
      <Flex
        justify="space-between"
        width="424px"
        align="center"
        styles={{ marginBottom: '26px' }}
      >
        <Text>{t('create-campaign.recycle-rules')}</Text>
        <FilledButton
          type="button"
          size="s"
          startIcon={<PlusIcon width="20px" height="20px" />}
          onClick={handleAddRule}
          disabled={disabled}
        >
          {t('create-campaign.add-recycle-rule')}
        </FilledButton>
      </Flex>
      {values.recycleRules[0] && (
        <Flex gap="12px" styles={{ marginBottom: '10px' }}>
          <Text styles={{ width: '200px' }} variant="f8">
            {t('create-campaign.recycle-rule-status')}
          </Text>
          <Text styles={{ width: '80px' }} variant="f8">
            {t('create-campaign.recycle-rule-delay')}
          </Text>
          <Text variant="f8">{t('create-campaign.recycle-rule-attempts')}</Text>
        </Flex>
      )}
      <Flex
        direction="column"
        styles={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto' }}
      >
        {values.recycleRules.map((rule: RecycleRule, index: number) => (
          <RecycleRuleRow
            formik={formik}
            key={rule.status}
            index={index}
            statuses={leadStatuses.map(({ value, name: label }) => ({ label, value }))}
          />
        ))}
      </Flex>
    </Flex>
  )
}
