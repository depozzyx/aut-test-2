import { TStylesProps, TMediaQueries } from '@peiko/styled'

type TSize = 's' | 'm' | 'l'

export type TCheckboxIconProps = {
  /**
   * The name of the checkbox
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Can be used to render elements or string inside the radio button
   * */
  label?: string
  /**
   * The size of the checkbox in pixels
   */
  size?: TSize | TMediaQueries<TSize>
  /**
   * Specify if the checkbox icon is disabled
   * @default false
   * */
  disabled?: boolean
  /**
   * Checkbox icon is controlled component
   *
   * Specify if the checkbox icon is checked
   * @default false
   * */
  checked?: boolean
  /**
   * Add custom icon to the checkbox when it is unchecked
   * */
  icon?: React.ReactNode
  /**
   * Add custom icon to the checkbox when it is checked
   * */
  checkedIcon?: React.ReactNode
  /**
   * Pass html props for input. [See docs](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.inputhtmlattributes.html)
   * @default undefined
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Callback function that is fired when the checkbox value is changed
   *
   * @type (isChecked: boolean) => void
   * */
  onChange?: (isChecked: boolean) => void
} & TStylesProps
