import React, { forwardRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { Input } from '../../Input'
import { getFieldError } from '../../utils/get-field-error'
import { TInputProps } from '../../Input/types'

type TProps = {
  formik: TFormik
  onInput?: React.FormEventHandler<HTMLInputElement>
} & TInputProps

export const FormikInput = forwardRef<HTMLInputElement, TProps>(
  ({ formik, onChange, onInput, ...props }, ref) => {
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

    return (
      <Input
        {...props}
        {...field}
        onChange={handleChange}
        onInput={onInput}
        error={fieldError}
        ref={ref}
      />
    )
  },
)
FormikInput.displayName = 'FormikInput'
