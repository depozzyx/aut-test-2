export type TToogleProps = {
  name: string
  /**
   * Checked makes the toogle controlled
   * */
  checked?: boolean
  /**
   * Specify the label of the toogle
   * */
  label?: string
  /**
   * Specify if the input is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * If error is provided input will be styles as error and render error message below
   */
  error?: string
  /**
   * Callback function that is fired when the toogle value is changed
   *
   * @type (isChecked: boolean) => void
   * */
  onChange?: (checked: boolean) => void
  /**
   * [Learn more](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.inputhtmlattributes.html)
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
