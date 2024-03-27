import { ChangeEvent, ReactElement } from 'react'
import { Props as InputMaskProps } from 'react-input-mask'
import { CSSProperties } from 'styled-components'
import { TStylesProps, TDefaultMediaQueries } from '@peiko/styles'
import { TLabelProps } from '../types'

// input
type TInputSize = 's' | 'm' | 'l'

export type TInputSizes = {
  /**
   * The size of the input
   */
  size?: TInputSize | Partial<TDefaultMediaQueries<TInputSize>>
  /** Define input size for different screens
   *
   * [See more about sizes prop](http://examples.dev-page.site/examples/props/sizes)
   */
}

export type TInputEvent = ChangeEvent<HTMLInputElement>

type TInputMaskProps = {
  /**
   * Is mask provided Input behave as masked input
   *
   * [Learn more](https://www.npmjs.com/package/react-input-mask#mask--string)
   * @default undefined
   * @type string | Array<(string | RegExp)>
   */
  mask?: InputMaskProps['mask']
  /**
   * [Learn more](https://www.npmjs.com/package/react-input-mask#maskchar--string)
   * @default undefined
   * @type string | null | undefined;
   */
  maskChar?: InputMaskProps['maskChar']
  /**
   * [Learn more](https://www.npmjs.com/package/react-input-mask#alwaysshowmask--boolean)
   * @default undefined
   * @type boolean
   */
  alwaysShowMask?: InputMaskProps['alwaysShowMask']
  /**
   * [Learn more](https://www.npmjs.com/package/react-input-mask#beforemaskedvaluechange--function)
   * @default undefined
   * @type (states: BeforeMaskedStateChangeStates): InputState
   */
  beforeMaskedStateChange?: InputMaskProps['beforeMaskedStateChange']
}

export type TInputProps = {
  /**
   * The name of the input
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * If editable `true` input will be editable with edit icon
   * @default undefined
   * @type boolean
   * */
  editable?: boolean
  /**
   * Specify the placeholder of the input
   * @default undefined
   * @type string
   * */
  placeholder?: string
  /**
   * Value makes the input controlled
   * @default undefined
   * @type string
   * */
  value?: string
  /**
   * Specify the type of the input
   *
   * type can be one of the following:
   * - 'text'
   * - 'password'
   * - 'email'
   * - 'number'
   * - 'search'
   *
   * @default 'text'
   */
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  /**
   * If error is provided input will be styles as error and render error message below
   * @default undefined
   * @type string
   * */
  error?: string
  /**
   * Specify if the input is required
   * @default false
   * @type boolean
   * */
  required?: boolean
  /**
   * Specify if the input is readonly
   * @default false
   * @type boolean
   * */
  readOnly?: boolean
  /**
   * Specify if the input is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * Specify debounce in milliseconds
   *
   * When debounce is specified, onChange event will fire after the debounce timer has passed. But value of the input will be changed immediately
   * @default 0
   * */
  debounce?: number
  /**
   * Specify the width of the input
   * @default undefined
   * type CSSProperties['width']
   * */
  width?: CSSProperties['width']
  /**
   * Specify the id of the input
   *
   * Use this prop to make label and input accessible for screen readers. If not provided `id` will be generated automatically by `name` prop
   * @default undefined
   * @type string
   * */
  id?: React.InputHTMLAttributes<HTMLInputElement>['id']
  /**
   * Callback function that is fired when the input is focused
   * @default undefined
   * type: (event: React.FocusEvent<HTMLInputElement>) => void
   * */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * Callback function that is fired when the input is blured
   * @default undefined
   * type: (event: React.BlurEvent<HTMLInputElement>) => void
   * */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * Callback function that is fired when the input value is changed
   * @default undefined
   * type: (value: string) => void
   * */
  onChange?: (value: string) => void

  /**
   * Callback function that add copy to clipboard functionality
   * @default undefined
   * @type: (value: string) => void
   * */
  onCopy?: (value: string) => void
  /**
   * Label component props
   * @default undefined
   * @example <Input label={{ text: 'Label text' }} />
   */
  label?: TLabelProps
  /**
   * Add adornment to the start of the input
   *
   * It's possible to pass `react element` or `function` that returns react element
   *
   * Function will receive props:
   * - value: string
   * - disabled: boolean
   * - focus: boolean
   *
   * @default undefined
   * @type ReactElement | ((props: { value: string; disabled: boolean; focus: boolean }) => ReactElement)
   * */
  startAdornment?:
    | ReactElement
    | ((props: { value: string; disabled: boolean; focus: boolean }) => ReactElement)
  /**
   * Add adornment to the end of the input
   *
   * It's possible to pass `react element` or `function` that returns react element
   *
   * Function will receive props:
   * - value: string
   * - disabled: boolean
   * - focus: boolean
   *
   * @default undefined
   * @type ReactElement | ((props: { value: string; disabled: boolean; focus: boolean }) => ReactElement)
   * */
  endAdornment?:
    | ReactElement
    | ((props: { value: string; disabled: boolean; focus: boolean }) => ReactElement)
  /**
   * Pass html props for input. [See docs](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.inputhtmlattributes.html)
   * @default undefined
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Specify the decimals of the input that is type number
   * By default there is no decimals
   * @default 0
   * */
  decimals?: number
} & TInputSizes &
  TInputMaskProps &
  TStylesProps
