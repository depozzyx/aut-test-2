import React, { useCallback, memo } from 'react'
import { getFieldError } from '@peiko/components/inputs/utils/get-field-error'
import useTranslation from 'next-translate/useTranslation'
import { TFormik } from '@peiko/types/formik'
import { VirtualizedMultiSelect } from '../../MutliSelect'
import { TMultiSelectProps, TSelectOption, TSelectEvent } from '../../MutliSelect/types'

type TProps = {
  formik: TFormik
} & TMultiSelectProps

export const FormikMultiSelect: React.FC<TProps> = memo(({ formik, ...props }) => {
  const { t } = useTranslation()
  const field = formik.getFieldProps(props.name)
  const { touched, error } = formik.getFieldMeta(props.name)

  // allow forwarding a custom onSearch callback (server-side or external search)
  const { onChange: propOnChange, onInputChange, ...restProps } = props as any

  const handleChange = useCallback(
    (selectedOptions: TSelectOption[]) => {
      formik.setFieldTouched(field.name, true)
      formik.setFieldValue(
        field.name,
        props.emitValues
          ? selectedOptions.map((option) => option.value)
          : selectedOptions,
      )
      if (propOnChange) {
        propOnChange(
          props.emitValues
            ? selectedOptions.map((option) => option.value)
            : selectedOptions,
        )
      }
    },
    [formik, propOnChange, field.name],
  )

  const fieldError = getFieldError({ touched, error, t })

  const handleInputChange = useCallback(
    (inputValue: string) => {
      if (typeof onInputChange === 'function') onInputChange(inputValue)
      return inputValue
    },
    [onInputChange],
  )

  return (
    <VirtualizedMultiSelect
      {...(restProps as TMultiSelectProps)}
      value={field.value}
      onChange={handleChange as (p: TSelectEvent) => void}
      error={fieldError}
      onInputChange={handleInputChange}
    />
  )
})

FormikMultiSelect.displayName = 'FormikMultiSelect'
