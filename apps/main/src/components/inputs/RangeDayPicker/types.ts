import { TContextMenu } from '@peiko/components/ContextMenu/types'
import { DayPickerRangeProps } from 'react-day-picker'

export enum EDateValue {
  FROM = 'from',
  TO = 'to',
}

export type TDateValue = {
  [EDateValue.FROM]?: Date
  [EDateValue.TO]?: Date
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
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element)
  isOpen?: boolean
  zIndex?: number
  menuClassName?: string
} & Omit<DayPickerRangeProps, 'mode' | 'onSelect' | 'selected'> &
  Pick<TContextMenu, 'customCloseHandler' | 'customOpenHandler'>
