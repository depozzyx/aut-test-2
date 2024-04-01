import { PhoneInputProps } from 'react-phone-input-2'
import { CSSProperties } from 'styled-components'
import { TLabelProps } from '../types'

export type TInputPhoneProps = {
  /**
   * The name of the input
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Set width of the input. If not provided, width will be 100%
   *
   * @default 100%
   * */
  width?: CSSProperties['width']
  label?: TLabelProps
  /**
   * Specify the placeholder of the input
   * @default undefined
   * @type string
   * */
  placeholder?: string
  /**
   * Specify if the input is readonly
   * @default false
   * @type boolean
   * */
  readOnly?: boolean
  /**
   * If error is provided input will be styles as error and render error message below
   * @default undefined
   * @type string
   * */
  error?: string
} & Omit<
  PhoneInputProps,
  | 'inputClass'
  | 'searchClass'
  | 'containerClass'
  | 'buttonClass'
  | 'dropdownClass'
  | 'containerStyle'
  | 'inputStyle'
  | 'dropdownStyle'
  | 'buttonStyle'
  | 'searchStyle'
>
