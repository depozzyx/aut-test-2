export type TRadioGroupProps = {
  /**
   * The name of the radio group
   *
   * This property is mandatory for formik use cases and proper accessibility
   * @required
   */
  name: string
  /**
   * Selected radio value
   * */
  value?: string | number
  /**
   * Radio buttons data
   * */
  options: {
    label: string
    value: string
    disabled?: boolean
  }[]
  /**
   * The default value
   * */
  defaultValue?: number | string
  /**
   * Callback function that is fired when the radio button value is changed
   * */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The error message
   * */
  error?: string
  /**
   * The direction of radio group
   * Could be row or column
   * @default row
   * */
  direction?: 'row' | 'column'
}
