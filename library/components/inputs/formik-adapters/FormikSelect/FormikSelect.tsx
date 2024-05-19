import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { Select } from '../../Select/Select'
import { getFieldError } from '../../utils/get-field-error'
import { TSelectEvent, TSelectProps } from '../../Select/types'

type TProps = {
  formik: TFormik
} & TSelectProps

export const FormikSelect: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation()
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (e: TSelectEvent) => {
    formik.setFieldTouched(field.name, true)
    formik.setFieldValue(field.name, e?.value)
    onChange?.(e)
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <Select {...props} onChange={handleChange} error={fieldError} value={field.value} />
  )
}
