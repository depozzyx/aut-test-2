import React, { useCallback, memo } from 'react'
import { getFieldError } from '@peiko/components/inputs/utils/get-field-error'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { deepEqual } from '@peiko/utils/deep-equal'
import { VirtualizedMultiSelect } from '../../MutliSelect'
import { TMultiSelectProps, TSelectOption, TSelectEvent } from '../../MutliSelect/types'

type TProps = {
  formik: TFormik
} & TMultiSelectProps

export const FormikMultiSelect: React.FC<TProps> = memo(({ formik, ...props }) => {
  const { t } = useTranslation()
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = useCallback(
    (selectedOptions: TSelectOption[]) => {
      formik.setFieldTouched(field.name, true)
      formik.setFieldValue(
        field.name,
        selectedOptions.map((option) => option.value),
      )
    },
    [formik],
  )

  const fieldError = getFieldError({ touched, error, t })

  return (
    <VirtualizedMultiSelect
      {...props}
      value={field.value}
      onChange={handleChange as (p: TSelectEvent) => void}
      error={fieldError}
    />
  )
}, deepEqual)

FormikMultiSelect.displayName = 'FormikMultiSelect'
