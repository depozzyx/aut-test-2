import { Dispatch, SetStateAction } from 'react'
import { TLabelProps } from '../types'

export type TCodeInputProps = {
  /**
   * The default code input
   */
  defaultValue?: string
  /**
   * The name of the input
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Function, which is called whenever the input is completed.
   * */
  onComplete?: (code: string) => void
  /**
   * Function, which is called whenever there is a change of value in the input box.
   *
   * @param code - The current value of the input box
   * @returns void
   */
  onChange?: (code: string) => void
  /**
   * If error is provided input will be styles as error and render error message below
   */
  error?: string
  /**
   * Specify the type of the code input
   *
   * type can be one of the following:
   * - 'text'
   * - 'number'
   *
   * @default 'text'
   */
  type?: 'text' | 'number'
  /**
   * Function, which is called whenever user press enter.
   *
   * @param code - The current value of the input box
   * @returns void
   */
  onSubmitCode?: (code: string) => void
  /**
   * Specify if the input is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * Specify the number of fields of the input
   */
  fields?: number
  /**
   * Setup autofocus on the first input
   */
  autoFocus?: boolean
  /**
   * The label for the code input
   */
  label?: TLabelProps
  /**
   * Object that contains cleaning state
   */
  cleaningState?: {
    cleanCodeInput: boolean
    setCleanCodeInput: Dispatch<SetStateAction<boolean>>
  }
}
