import { useState, memo, useCallback, useEffect, useMemo } from 'react'
import { DateRange } from 'react-day-picker'
import useTranslation from 'next-translate/useTranslation'
import { startOfDay, addMonths, subMonths } from 'date-fns'
import { deepEqual } from '@peiko/utils/deep-equal'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { TextButton } from '@peiko/components/buttons/TextButton'
import { getDateButtonLabel } from '@/components/RangeDayPicker/utils'
import { CustomFilledBtn, StyledRangeDayPicker } from './RangeDayPicker.styled'
import { TRangeDayPickerProps } from './types'

const containerStyles = `
  box-shadow: '0 0 12px 0 rgba(40, 63, 123, 0.25)';
  border-radius: 8px;
  background-color: #fefefe;
  padding: 16px 24px;
`

const initialDate: TRangeDayPickerProps['dateValue'] = {
  from: undefined,
  to: undefined,
}

const today = new Date()

export const RangeDayPicker = memo<TRangeDayPickerProps>(
  ({ dateValue, onChange, ...otherProps }): JSX.Element => {
    const { t } = useTranslation('datepicker')
    const [selectedDate, setSelectedDate] =
      useState<TRangeDayPickerProps['dateValue']>(initialDate)
    const [currentToMonth, setCurrentToMonth] = useState<Date>(today)
    const [currentFromMonth, setCurrentFromMonth] = useState<Date>(subMonths(today, 1))

    useEffect(() => {
      if (dateValue) {
        setSelectedDate({
          from: dateValue.from,
          to: dateValue.to,
        })
      }
    }, [dateValue])

    const handleMonthChangeTo = useCallback((month: Date) => {
      setCurrentToMonth(month)
    }, [])

    const handleMonthChangeFrom = useCallback((month: Date) => {
      setCurrentFromMonth(month)
    }, [])

    const dateToShow = useMemo(
      () => getDateButtonLabel({ from: selectedDate?.from, to: selectedDate?.to, t }),
      [selectedDate?.from, selectedDate?.to, t],
    )

    const modifiers = {
      range: {
        from: selectedDate?.from,
        to: selectedDate?.to,
      },
    }

    const handleDayClick = useCallback(
      (day: Date) => {
        const newDay = startOfDay(day)
        const newDayTime = newDay.getTime()

        if (!selectedDate?.from || (selectedDate.from && selectedDate.to)) {
          setSelectedDate({ from: newDay, to: undefined })
          return
        }

        const fromTime = selectedDate.from.getTime()

        const isFromEarlier = newDayTime < fromTime
        const newFromDate = isFromEarlier ? newDay : selectedDate.from
        const newToDate = isFromEarlier ? selectedDate.from : newDay

        setSelectedDate({ from: newFromDate, to: newToDate })

        if (onChange && newDay !== selectedDate.from) {
          onChange({ from: newFromDate, to: newToDate })
        }
      },
      [onChange, selectedDate],
    )

    const handleReset = () => {
      setSelectedDate(initialDate)
      onChange?.(initialDate)
    }

    const Calendar = (): JSX.Element => (
      <Flex align="start" direction="column">
        <Flex gap={50} width="100%">
          <Flex width="100%" direction="column" align="center" gap={12}>
            <Text color="main3" variant="f6">
              {t('start-date')}
            </Text>
            <StyledRangeDayPicker
              id="from"
              mode="range"
              numberOfMonths={1}
              month={currentFromMonth}
              onMonthChange={handleMonthChangeFrom}
              toMonth={subMonths(currentToMonth, 1)}
              modifiers={modifiers}
              onDayClick={handleDayClick}
              selected={selectedDate as DateRange}
              {...otherProps}
            />
          </Flex>
          <Flex width="100%" direction="column" align="center" gap={12}>
            <Text color="main3" variant="f6">
              {t('end-date')}
            </Text>
            <StyledRangeDayPicker
              id="to"
              mode="range"
              numberOfMonths={1}
              toMonth={today}
              month={currentToMonth}
              fromMonth={addMonths(currentFromMonth, 1)}
              onMonthChange={handleMonthChangeTo}
              modifiers={modifiers}
              onDayClick={handleDayClick}
              selected={selectedDate as DateRange}
              disabled={{ after: today }}
              {...otherProps}
            />
          </Flex>
        </Flex>
        <Flex width="100%" justify="center">
          <TextButton onClick={handleReset}>{t('reset-date')}</TextButton>
        </Flex>
      </Flex>
    )

    return (
      <ContextMenu
        on="click"
        position="bottom center"
        offsetY={12}
        containerStyles={containerStyles}
        trigger={<CustomFilledBtn title={dateToShow} />}
        renderMenu={() => <Calendar />}
      />
    )
  },
  deepEqual,
)

RangeDayPicker.displayName = 'RangeDayPicker'
