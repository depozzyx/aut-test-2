import { TInputProps } from '../../Input/types'

export type TNumberInputProps = {
  /**
   * Value makes the input controlled
   * @default undefined
   * @type number
   * */
  value?: number
  /**
   * Hide plus and minus controls
   * @default false
   * @type boolean
   */
  hideControls?: boolean
  /**
   * Callback function that is fired when the input value is changed
   * @default undefined
   * */
  onChange?: (value: number) => void
} & Omit<
  TInputProps,
  | 'type'
  | 'endAdornment'
  | 'value'
  | 'onChange'
  | 'alwaysShowMask'
  | 'mask'
  | 'maskChar'
  | 'beforeMaskedStateChange'
>
