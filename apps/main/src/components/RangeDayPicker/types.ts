import { DayPickerRangeProps } from 'react-day-picker'

type TDateValue = {
  from?: Date
  to?: Date
}

export type TRangeDayPickerProps = {
  /**
   * The value of the date picker.
   * */
  dateValue?: TDateValue
  /**
   * The on change handler of the date picker.
   * Triggers when user selects a date in calendar.
   * */
  onChange?: (date: TDateValue) => void
} & Omit<DayPickerRangeProps, 'mode' | 'onSelect' | 'selected'>
