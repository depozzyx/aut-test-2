import { DayPickerSingleProps } from 'react-day-picker'

export type TDayPickerProps = {
  /**
   * The value of the date picker.
   * Valid any Date object.
   * */
  value?: Date | undefined
  /**
   * The on change hadler of the date picker.
   *
   * Triggers when user selects a date in calendar.
   * */
  onChange?: (date: Date | undefined) => void
} & Omit<DayPickerSingleProps, 'mode' | 'onSelect'>
