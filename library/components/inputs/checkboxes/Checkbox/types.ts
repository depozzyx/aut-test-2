export type TCheckboxEvent = {
  name: string
  value: boolean
}

export type TCheckBoxProps = {
  /**
   * Specify if the radio buttpn is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * Callback function that is fired when the checkbox value is changed
   *
   * @type ({ name: string, value: boolean }) => void
   * */
  onChange?: (e: TCheckboxEvent) => void
  /**
   * If error is provided checkbox will be styled as error
   */
  error?: string
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
  label?: string | JSX.Element
  /**
   * Value makes the radio button controlled
   * */
  value?: boolean
  /**
   * The size of the checkbox
   */
  size?: 's' | 'm'
  /**
   * Сhange the appearance of the checkbox in the false state
   */
  indeterminate?: boolean
}
