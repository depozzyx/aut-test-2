import { useState, memo, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@peiko/utils/deep-equal'
import { DateRange } from 'react-day-picker'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { format } from 'date-fns'
import { CustomFilledBtn, StyledRangeDayPicker } from './RangeDayPicker.styled'
import { TRangeDayPickerProps } from './types'

const containerStyles = `
  box-shadow: '0 0 12px 0 rgba(40, 63, 123, 0.25)';
  border-radius: 8px;
  background-color: #fefefe;
  padding: 16px 24px;
`

export const RangeDayPicker = memo<TRangeDayPickerProps>(
  ({ initialValue, onChange, ...otherProps }): JSX.Element => {
    const { t } = useTranslation('datepicker')
    const [selectedDate, setSelectedDate] = useState<
      TRangeDayPickerProps['initialValue']
    >(
      initialValue || {
        from: undefined,
        to: undefined,
      },
    )

    const handleSelect = useCallback((newDate) => {
      setSelectedDate({
        from: newDate?.from,
        to: newDate?.to,
      })

      if (onChange) {
        onChange(newDate)
      }
    }, [])

    const dateToShow =
      // eslint-disable-next-line no-nested-ternary
      selectedDate?.from && selectedDate?.to
        ? `${format(selectedDate?.from, 'dd/MM/yyyy')} - ${format(
            selectedDate?.to,
            'dd/MM/yyyy',
          )}`
        : // eslint-disable-next-line no-nested-ternary
        selectedDate?.from
        ? `${format(selectedDate?.from, 'dd/MM/yyyy')} -`
        : selectedDate?.to
        ? `- ${format(selectedDate?.to, 'dd/MM/yyyy')}`
        : t('common:date')

    const Calendar = () => (
      <Flex>
        <Flex align="center" justify="center" direction="column" gap={12}>
          <Flex align="center" gap={50} width="100%">
            <Flex width="100%" justify="center">
              <Text color="main3" variant="f6">
                {t('start-date')}
              </Text>
            </Flex>
            <Flex width="100%" justify="center">
              <Text color="main3" variant="f6">
                {t('end-date')}
              </Text>
            </Flex>
          </Flex>
          <StyledRangeDayPicker
            initialFocus
            mode="range"
            onSelect={handleSelect}
            selected={selectedDate as DateRange}
            numberOfMonths={2}
            fromMonth={new Date(2024, 4)}
            toMonth={new Date(2024, 9)}
            {...otherProps}
          />
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
