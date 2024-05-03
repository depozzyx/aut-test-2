import { DayPickerRangeProps } from 'react-day-picker'

type TDateVale = {
  from?: Date
  to?: Date
}

export type TRangeDayPickerProps = {
  dateValue?: TDateVale
  /**
   * The on change handler of the date picker.
   * Triggers when user selects a date in calendar.
   * */
  onChange?: (date: TDateVale) => void
} & Omit<DayPickerRangeProps, 'mode' | 'onSelect' | 'selected'>
