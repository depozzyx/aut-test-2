import { ReactElement } from 'react'
import { SingleValue } from 'react-select'
import { CSSProperties, DefaultTheme } from 'styled-components'
import { TStylesProps } from '@peiko/styled'
import { TLabelProps } from '../types'

export type TSelectOption = {
  /**
   * The value of the option.
   */
  readonly value: string
  /**
   * The label of the option.
   */
  readonly label: string | ReactElement
}

export type TSelectOptions = readonly TSelectOption[]

export type TSelectEvent = SingleValue<TSelectOption>

export type TSelectProps = {
  /**
   * The size of the select
   */
  size?: 's' | 'm' | 'l'
  /**
   * Specify the placeholder of the inlut select
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
  value?: TSelectOption['value']
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
   * If error is provided input will be styled as error and render error message below
   * @default undefined
   * @type string
   * */
  error?: string
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
} & TStylesProps
