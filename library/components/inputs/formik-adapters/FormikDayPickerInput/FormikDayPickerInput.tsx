import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { DayPickerInput } from '../../DayPickerInput'
import { getFieldError } from '../../utils/get-field-error'
import { TDayPickerInputProps } from '../../DayPickerInput/types'

type TProps = {
  formik: TFormik
} & TDayPickerInputProps

export const FormikDayPickerInput: React.FC<TProps> = ({
  formik,
  onChange,
  ...props
}) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)

  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (value: Date) => {
    formik.setFieldValue(field.name, value)

    if (onChange) {
      onChange(value)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return (
    <DayPickerInput
      {...props}
      {...field}
      onChange={handleChange}
      error={fieldError || error}
    />
  )
}
