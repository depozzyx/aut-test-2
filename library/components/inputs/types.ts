import { CSSProperties, ReactElement } from 'react'
import { DefaultTheme } from 'styled-components'

export type TLabelProps = {
  /**
   * Label text
   */
  label?: string | ReactElement
  /**
   * Additional button
   */
  additionalButton?: ReactElement
  htmlFor?: string
  color?: keyof DefaultTheme['palette']
  error?: string
  style?: CSSProperties
  errorAlign?: CSSProperties['textAlign']
  required?: boolean
  readOnly?: boolean
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
}
