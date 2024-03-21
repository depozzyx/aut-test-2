import { CSSProperties } from 'styled-components'
import { TStylesProps, TDefaultMediaQueries } from '@peiko/styled'
import { TLabelProps } from '../types'

// textarea
type TTextAreaSize = 's' | 'm' | 'l'

export type TTextAreaSizes = {
  /**
   * The size of the textarea
   */
  size?: TTextAreaSize | Partial<TDefaultMediaQueries<TTextAreaSize>>
  /** Define textarea size for different screens
   *
   * [See more about sizes prop](http://examples.dev-page.site/examples/props/sizes)
   */
}

export type TTextAreaProps = {
  /**
   * The name of the textarea
   *
   * This property is mandatory for formik use cases and proper accessibility.
   * @required
   */
  name: string
  /**
   * Specify the placeholder of the textarea
   * @default undefined
   * @type string
   * */
  placeholder?: string
  /**
   * Value makes the textarea controlled
   * @default undefined
   * @type string
   * */
  value?: string
  /**
   * If error is provided textarea will be styled as error and render error message below
   * @default undefined
   * @type string
   * */
  error?: string
  /**
   * Specify if the textarea is required
   * @default false
   * @type boolean
   * */
  required?: boolean
  /**
   * Specify if the textarea is disabled
   * @default false
   * @type boolean
   * */
  disabled?: boolean
  /**
   * Specify the width of the textarea
   * @default undefined
   * type CSSProperties['width']
   * */
  width?: CSSProperties['width']
  /**
   * Specify the id of the textarea
   *
   * Use this prop to make label and textarea accessible for screen readers. If not provided `id` will be generated automatically by `name` prop
   * @default undefined
   * @type string
   * */
  id?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['id']
  /**
   * Callback function that is fired when the textarea is focused
   * @default undefined
   * type: (event: React.FocusEvent<HTMLTextAreaElement>) => void
   * */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  /**
   * Callback function that is fired when the textarea is blured
   * @default undefined
   * type: (event: React.BlurEvent<HTMLTextAreaElement>) => void
   * */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  /**
   * Callback function that is fired when the textarea value is changed
   * @default undefined
   * type: (value: string) => void
   * */
  onChange?: (value: string) => void
  /**
   * Label component props
   * @default undefined
   * @example <TextArea label={{ text: 'Label text' }} />
   */
  label?: TLabelProps
  /**
   * Pass html props for textarea. [See docs](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.inputhtmlattributes.html)
   * @default undefined
   */
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  /**
   * The possibility to resize the textarea.
   */
  resize?: boolean
} & TTextAreaSizes &
  TStylesProps
