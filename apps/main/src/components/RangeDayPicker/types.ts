import { DayPickerRangeProps } from 'react-day-picker'

export type TRangeDayPickerProps = {
  /**
   * The value of the date picker.
   * Valid any Date object.
   * */
  initialValue?: {
    from?: Date
    to?: Date
  }
  /**
   * The on change hadler of the date picker.
   *
   * Triggers when user selects a date in calendar.
   * */
  onChange?: (date: Date | undefined) => void
} & Omit<DayPickerRangeProps, 'mode' | 'onSelect' | 'selected'>
