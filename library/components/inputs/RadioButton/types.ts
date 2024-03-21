export type TRadioProps = {
  /**
   * The name of the radio button
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Callback function that is fired when the radio button value is changed
   * */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Can be used to render elements or string inside the radio button
   * */
  label?: JSX.Element | string
  /**
   * [Learn more](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.inputhtmlattributes.html)
   */
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * The error message.
   * */
  error?: string
}
