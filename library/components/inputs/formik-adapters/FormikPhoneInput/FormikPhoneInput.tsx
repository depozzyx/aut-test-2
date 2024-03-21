import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { TInputPhoneProps } from '../../PhoneInput/types'
import { PhoneInput } from '../../PhoneInput/PhoneInput'

type TProps = {
  formik: TFormik
} & TInputPhoneProps

export const FormikPhoneInput: React.FC<TProps> = ({ formik, onChange, ...props }) => {
  const { t } = useTranslation('validation')
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  const handleChange: TInputPhoneProps['onChange'] = (
    value,
    countryData,
    event,
    formattedvalue,
  ) => {
    formik.setFieldValue(field.name, value)

    if (onChange) {
      onChange(value, countryData, event, formattedvalue)
    }
  }

  const fieldError = getFieldError({ touched, error, t })

  return <PhoneInput {...props} {...field} onChange={handleChange} error={fieldError} />
}
