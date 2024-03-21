import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { RadioGroup } from '../../RadioGroup'
import { TRadioGroupProps } from '../../RadioGroup/types'

type TProps = {
  formik: TFormik
} & TRadioGroupProps

export const FormikRadio: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const { setTouched, getFieldProps, getFieldMeta, setFieldValue } = formik
  const field = getFieldProps(props.name)
  const { touched, error } = getFieldMeta(field.name)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value)
    setTouched({ radio: true })
    onChange?.(event)
  }

  const fieldError = getFieldError({ touched, error, t })

  return <RadioGroup {...props} {...field} onChange={handleChange} error={fieldError} />
}
