import { RangeDayPicker } from '@/inputs/RangeDayPicker'
import {
  EDateValue,
  TDateValue,
  TRangeDayPickerProps,
} from '@/inputs/RangeDayPicker/types'
import { CalendarIcon } from '@peiko/components/icons/CalendarIcon'
import { Label } from '@peiko/components/inputs/Label'
import { TLabelProps } from '@peiko/components/inputs/types'
import { getFieldError } from '@peiko/components/inputs/utils/get-field-error'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback, useState } from 'react'
import { format } from 'date-fns'
import { Text } from '@peiko/components/Text'
import { dateToString } from '@/utils/date-to-string'
import { TFormik } from '@peiko/types/formik'
import { TriggerButton } from './FormikRangeDayPicker.styled'

type TValue = {
  from: string
  to: string
}

export type TFormikRangeDayPicker = {
  formik: TFormik<{
    dates: TValue
  }>
  name: string
  label?: TLabelProps
} & TRangeDayPickerProps

export const FormikRangeDayPicker: FC<TFormikRangeDayPicker> = ({
  formik,
  name,
  onChange,
  label,
  ...props
}) => {
  const { t } = useTranslation('common')

  const field = formik.getFieldProps(name)
  const { touched, error } = formik.getFieldMeta(name)

  const [isOpen, setIsOpen] = useState(false)

  const onChangeDate = (date: TDateValue) => {
    formik.setFieldTouched(field.name, true)
    if (date[EDateValue.FROM] && date[EDateValue.TO])
      formik.setFieldValue(field.name, {
        from: dateToString(date[EDateValue.FROM]),
        to: dateToString(date[EDateValue.TO]),
      })

    onChange?.(date)
  }
  const fieldError = useCallback(() => {
    if (error) {
      const typedError = error as unknown as TValue
      if (typedError.from) return getFieldError({ touched, error: typedError.from, t })
      if (typedError.to) return getFieldError({ touched, error: typedError.to, t })
    }
    return ''
  }, [error])

  const renderContent = useCallback(() => {
    if (field.value.from && field.value.to) {
      return `${format(new Date(field.value.from), 'yyyy/MM/dd')} - ${format(
        new Date(field.value.to),
        'yyyy/MM/dd',
      )}`
    }
    return (
      // eslint-disable-next-line i18next/no-literal-string
      <Text variant="f8" color="main22">
        ____/__/__ - ____/__/__
      </Text>
    )
  }, [field])

  return (
    <div>
      <Label {...label} error={fieldError()} onClick={() => setIsOpen(true)}>
        <RangeDayPicker
          trigger={
            <TriggerButton type="button" isOpen={isOpen} endIcon={<CalendarIcon />}>
              {renderContent()}
            </TriggerButton>
          }
          onChange={onChangeDate}
          {...props}
          isOpen={isOpen}
          customOpenHandler={() => setIsOpen(true)}
          customCloseHandler={() => setIsOpen(false)}
        />
      </Label>
    </div>
  )
}
