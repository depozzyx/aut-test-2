import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { Input } from '../../Input'
import { getFieldError } from '../../utils/get-field-error'
import { TInputProps } from '../../Input/types'

type TProps = {
  formik: TFormik
} & TInputProps

export const FormikInput: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (value: string) => {
    formik.setFieldValue(field.name, value)

    if (onChange) {
      onChange(value)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <Input {...props} {...field} onChange={handleChange} error={fieldError} />
}
