import React from 'react'
import { getFieldError } from '@peiko/components/inputs/utils/get-field-error'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { MultiSelect } from '../../MutliSelect'
import { TMultiSelectProps, TSelectOption, TSelectEvent } from '../../MutliSelect/types'

type TProps = {
  formik: TFormik
} & TMultiSelectProps

export const FormikMultiSelect: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('common')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (selectedOptions: TSelectOption[]) => {
    formik.setFieldTouched(field.name, true)
    formik.setFieldValue(
      field.name,
      selectedOptions.map((option) => option.value),
    )
    if (onChange) {
      onChange(selectedOptions)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <MultiSelect
      {...props}
      value={field.value}
      onChange={handleChange as (p: TSelectEvent) => void}
      error={fieldError}
    />
  )
}
