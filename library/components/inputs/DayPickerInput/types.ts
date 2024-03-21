import { TDayPickerProps } from '@peiko/components/DayPicker/types'
import { TInputProps } from '../Input/types'

export type TDateFormat =
  | 'yyyy-MM-dd'
  | 'yyyy/MM/dd'
  | 'yyyy.MM.dd'
  | 'dd/MM/yyyy'
  | 'dd-MM-yyyy'
  | 'dd.MM.yyyy'

export type TDayPickerInputProps = {
  /**
   * The date value of the input. Must be a Date object or a string in the format defined by the dateFormat prop.
   */
  value?: Date | string
  /**
   * The format of the date displayed in the input field. Must be a string with the following tokens:
   * - `d`: Day of the month, from 1 through 31.
   * - `dd`: Day of the month, from 01 through 31.
   * - `M`: Month, from 1 through 12.
   * - `MM`: Month, from 01 through 12.
   * - `MMM`: Month, from Jan through Dec.
   * - `MMMM`: Month, from January through December.
   * - `yy`: Year, from 00 through 99.
   * - `yyyy`: Year, such as 2019.
   * - `YYYY`: Year, such as 2019.
   * - `YYYYY`: Year, such as 02019.
   */
  dateFormat?: TDateFormat
  /**
   * Define the props passed to the DayPicker Single component.
   *
   * [DayPicker api](https://react-day-picker.js.org/api/interfaces/DayPickerSingleProps)
   */
  dayPickerProps?: TDayPickerProps
  /**
   * Chnage handler called when the user types or change day in calendar
   */
  onChange?: (value: Date) => void
  /**
   * Error handler called when the user types or change day in calendar
   */
  onError?: (message?: string) => void
} & Omit<
  TInputProps,
  | 'onChange'
  | 'mask'
  | 'endAdornment'
  | 'value'
  | 'onError'
  | 'alwaysShowMask'
  | 'beforeMaskedStateChange'
  | 'maskChar'
  | 'onCopy'
  | 'editable'
>
