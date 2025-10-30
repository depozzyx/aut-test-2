import { ReactElement } from 'react'
import { MultiValue, SingleValue } from 'react-select'
import { CSSProperties, DefaultTheme } from 'styled-components'
import { TStylesProps } from '@peiko/styles'
import { TLabelProps } from '@peiko/components/inputs/types'

export type TSelectOption<T = string | number | boolean | undefined> = {
  /**
   * The value of the option.
   */
  readonly value: T
  /**
   * The label of the option.
   */
  readonly label: string | ReactElement
}

export type TSelectEvent = SingleValue<TSelectOption> | MultiValue<TSelectOption>

export type TMultiSelectProps = {
  /**
   * The size of the select
   */
  size?: 's' | 'sm' | 'm' | 'l'
  /**
   * Specify the placeholder of the input select
   * */
  placeholder?: string
  /**
   * Specify the options of the input select
   *
   * Each option is object with two properties:
   * - value: string
   * - label: string | ReactElement
   *
   * Notice that the value of the option must be unique.
   *
   * Label can be a string or a ReactElement.
   *
   * @type {
   *  value: string
   *  label: string | ReactElement
   * }[]
   * */
  options?: TSelectOption[]
  /**
   * Select is controlled component, so you need to specify the value of the input select if you need to change it.
   * */
  value?:
    | Array<TSelectOption | string | number | boolean>
    | TSelectOption
    | string
    | number
    | boolean
  /**
   * Specify if the select is searchable. It allows to search for options by typing.
   * */
  isSearchable?: boolean
  /**
   * The name of the input
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Specify if the input is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * Callback function that is fired when the select value is changed
   * @default undefined
   * type: (value: string) => void
   * */
  onChange?: (p: TSelectEvent) => void
  /**
   * If error is provided input will be styles as error and render error message below
   * @default undefined
   * @type string
   * */
  error?: string
  /**
   * Specify the label of the input select
   * */
  label?: TLabelProps
  /**
   * Specify the max height of the input select dropdown
   *
   * Use pixels number or string
   * */
  maxMenuHeight?: number
  /**
   * Specify the width of the input select
   *
   * Use pixels number or string
   * */
  width?: CSSProperties['width']
  /**
   * Specify the background color of the select input
   *
   * Use one of the colors from the theme palette
   *
   * For example: `base100`, `base200`, `main2`, etc
   * */
  backgroundColor?: keyof DefaultTheme['palette']
  /**
   * Specify the z-index of the input select dropdown
   *
   * can be used to fix the dropdown position
   *
   * Use pixels number or string
   * */
  zIndex?: CSSProperties['zIndex']
  /**
   * Callback function that is fired when the scroll reaches the bottom of the menu
   */
  onMenuScrollToBottom?: () => void
  /**
   * Specify the default value of the input select
   */
  defaultValue?: TSelectOption[]
  menuPortalTarget?: HTMLElement
  /**
   * Callback when the input value changes (search input).
   * Signature matches react-select onInputChange: (inputValue) => void | string
   */
  onInputChange?: (inputValue: string) => void | string
  emitValues?: boolean
  hideSelectedOptions?: boolean
  isMulti?: boolean
  /** When true, selected values render inside the control; set false to hide chips */
  controlShouldRenderValue?: boolean
} & TStylesProps
