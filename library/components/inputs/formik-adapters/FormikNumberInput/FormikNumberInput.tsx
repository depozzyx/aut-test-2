import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { NumberInput } from '../../number-inputs/NumberInput'
import { TNumberInputProps } from '../../number-inputs/types'

type TProps = {
  formik: TFormik
} & TNumberInputProps

export const FormikNumberInput: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange = (value: number) => {
    // handle cases when value changed by buttons
    formik.setFieldTouched(props.name, true)

    field.onChange({ target: { value, name: props.name } })

    if (onChange) {
      onChange(value)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <NumberInput {...props} {...field} onChange={handleChange} error={fieldError} />
}
