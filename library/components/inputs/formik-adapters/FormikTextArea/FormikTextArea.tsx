import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { getFieldError } from '../../utils/get-field-error'
import { TTextAreaProps } from '../../TextArea/types'
import { TextArea } from '../../TextArea/TextArea'

type TProps = {
  formik: TFormik
} & TTextAreaProps

export const FormikTextArea: React.FC<TProps> = ({ formik, onChange, ...props }) => {
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

  return <TextArea {...props} {...field} onChange={handleChange} error={fieldError} />
}
