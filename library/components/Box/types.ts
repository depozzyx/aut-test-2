import { TStylesProps } from '@peiko/styles'

export type TBoxProps = {
  /**
   * The content of the component.
   * @type React.ReactNode
   */
  children?: React.ReactNode
  className?: string
} & TStylesProps
