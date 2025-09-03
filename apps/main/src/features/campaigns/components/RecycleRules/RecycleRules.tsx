import React, { FC, useEffect, useRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { FilledButton } from '@peiko/components/buttons/FilledButton/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon/PlusIcon'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TFormik } from '@peiko/types/formik'
import { TLeadStatusData } from '@/api-rest/leads/types'
import { recycleRulesSchema } from '@/utils/validation'
import { RecycleRuleRow } from './RecycleRuleRow'

interface RecycleRule {
  status: string
  delay: string
  attempts: number
}

type Props = {
  formik: TFormik
  leadStatuses: TLeadStatusData[]
  height?: number
}

export const RecycleRules: FC<Props> = ({ formik, leadStatuses, height }: Props) => {
  const { t } = useTranslation('campaigns')

  const { values, setFieldValue } = formik

  const handleAddRule = async () => {
    await setFieldValue(
      'recycleRules',
      [{ status: [], delay: '00:15', attempts: 1 }, ...(values.recycleRules ?? [])],
      false,
    )
  }

  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const checkRuleValidation = async (rule: RecycleRule) => {
      const res = await recycleRulesSchema.isValid(rule)
      return res
    }

    checkRuleValidation(formik.values.recycleRules)
      .then((result) => {
        setDisabled(!result)
      })
      .catch(() => {
        setDisabled(true)
      })
  }, [formik.values.recycleRules, leadStatuses])

  const refHead = useRef<HTMLDivElement>(null)
  const [recycleRulesHeight, setRecycleRulesHeight] = useState<string>('none')

  useEffect(() => {
    if (height && refHead.current) {
      const maxHeight = height - refHead.current.offsetHeight - 48 - 26
      setRecycleRulesHeight(`${maxHeight}px`)
    }
  }, [height])

  return (
    <Flex maxWidth="424px" width="100%" direction="column" justify="flex-start">
      <Flex
        ref={refHead}
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

      <Flex
        direction="column"
        justify="flex-start"
        styles={{
          height: recycleRulesHeight,
          overflowY: 'auto',
        }}
      >
        {values.recycleRules?.map((rule: RecycleRule, index: number) => (
          <RecycleRuleRow
            formik={formik}
            key={rule.status}
            index={index}
            statuses={leadStatuses.map(({ value, name: label }) => ({ label, value }))}
          />
        )) ?? []}
      </Flex>
    </Flex>
  )
}
