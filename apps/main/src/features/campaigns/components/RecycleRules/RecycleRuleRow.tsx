import React, { FC, useEffect, useState } from 'react'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { Flex } from '@/components/Flex'
import { TSelectOption } from '@/components/MutliSelect/types'
import { TFormik } from '@peiko/types/formik'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'
import { TRecycleRule } from '@/api-rest/campaigns/types'

interface Props {
  formik: TFormik
  index: number
  statuses: TSelectOption[]
}

export const RecycleRuleRow: FC<Props> = ({ formik, index, statuses }) => {
  const [disabled, setDisabled] = useState(false)

  useEffect(
    () => setDisabled(index !== 0 && !formik.values.recycleRules[0].status),
    [formik, index],
  )

  return (
    <Flex gap="12px" align="start" styles={{ marginBottom: '8px' }}>
      <FormikSelect
        formik={formik}
        name={`recycleRules[${index}].status`}
        options={statuses.filter(
          (option) =>
            !formik.values.recycleRules
              .filter((_: TRecycleRule, i: number) => i !== index)
              .map((r: TRecycleRule) => r.status)
              .includes(option.value),
        )}
        width="200px"
        maxMenuHeight={150}
        disabled={disabled}
      />
      <FormikInput
        formik={formik}
        type="time"
        name={`recycleRules[${index}].delay`}
        width="80px"
        size="s"
        disabled={disabled}
      />
      <FormikInput
        formik={formik}
        name={`recycleRules[${index}].attempts`}
        type="number"
        placeholder=""
        width="80px"
        size="s"
        disabled={disabled}
      />
      <IconButton
        iconColor="main13"
        onClick={() =>
          formik.setFieldValue(
            `recycleRules`,
            formik.values.recycleRules.filter(
              (_: TRecycleRule, i: number) => i !== index,
            ),
          )
        }
        disabled={disabled}
      >
        <TrashIcon width="20px" height="20px" />
      </IconButton>
    </Flex>
  )
}
