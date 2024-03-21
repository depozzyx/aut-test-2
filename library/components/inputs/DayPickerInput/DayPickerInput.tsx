import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { parse, isValid, format } from 'date-fns'
import { useUpdateEffect } from 'react-use'
import { CalendarIcon } from '@peiko/components/icons/CalendarIcon'
import { DayPicker } from '@peiko/components/DayPicker'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { Input } from '../Input'
import { TDayPickerInputProps } from './types'
import { formatToMask } from '../utils/format-date-mask'

export const DayPickerInput: React.FC<TDayPickerInputProps> = ({
  dateFormat = 'yyyy-MM-dd',
  placeholder,
  dayPickerProps,
  onChange,
  onError,
  ...props
}) => {
  const { t } = useTranslation('validation')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [inputValue, setInputValue] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (props.value instanceof Date) {
      setInputValue(format(props.value, dateFormat))
      setSelectedDate(props.value)
      return
    }

    setSelectedDate(undefined)
    setInputValue('')
  }, [props.value])

  const handleInputChange = (value: string) => {
    setInputValue(value)

    const parsedDate = parse(value, dateFormat, new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }

  const handleDayChange = (date: Date | undefined) => {
    setSelectedDate(date)

    if (date) {
      setInputValue(format(date, dateFormat))
    } else {
      setInputValue('')
    }
  }

  useUpdateEffect(() => {
    const parsedDate = parse(inputValue, dateFormat, new Date())

    if (isValid(parsedDate)) {
      onChange?.(parsedDate)
    } else {
      onError?.(t('invalid-date'))
    }
  }, [inputValue])

  const mask = formatToMask(dateFormat)

  return (
    <div ref={containerRef}>
      <Input
        {...props}
        mask={mask}
        placeholder={placeholder || dateFormat.toUpperCase()}
        onChange={handleInputChange}
        value={inputValue}
        endAdornment={
          <ContextMenu
            repositionOnResize
            position="bottom left"
            offsetY={10}
            trigger={
              <IconButton iconColor="main11" disabled={props.disabled}>
                <CalendarIcon />
              </IconButton>
            }
            renderMenu={({ onClose }) => (
              <DayPicker
                disabled={props.disabled}
                defaultMonth={selectedDate}
                selected={selectedDate}
                onChange={(date) => {
                  handleDayChange(date)
                  onClose()
                }}
                {...dayPickerProps}
              />
            )}
          />
        }
      />
    </div>
  )
}
