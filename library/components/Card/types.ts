import { CSSProperties, DefaultTheme } from 'styled-components'
import { TMediaQueries } from '@peiko/styled/types/breakpoints'
import { TStylesProps } from '@peiko/styled'

export type TCardStylesProps = {
  /**
   * The border radius of the card. Valid any CSS value.
   *
   * @default 4px
   */
  borderRadius?: CSSProperties['borderRadius']
  /**
   * The background color of the card.
   *
   * You can specify the color of the card according to the theme palette.
   *
   * @default main8
   */
  bgColor?: keyof DefaultTheme['palette']
  /**
   * The width of the card in pixels number or string.
   *
   * @default 100%
   */
  maxWidth?: CSSProperties['maxWidth']
  /**
   * [Box Shadow API](https://developer.mozilla.org/docs/Web/CSS/box-shadow)
   */
  boxShadow?: CSSProperties['boxShadow']
  /**
   * The content of the card.
   *
   * Valid any ReactNode.
   *
   * @type React.ReactNode
   */
  children?: React.ReactNode
  /**
   * The padding of the card. Valid any CSS value.
   *
   * @default 16px
   */
  padding?: CSSProperties['padding']
  /**
   * The margin of the card. Valid any CSS value.
   *
   * @default 0
   */
  margin?: CSSProperties['margin']
  /**
   * If true, the card will take up the full width of its container.
   */
  fullWidth?: boolean
  /**
   * If true, the card will take up the full height of its container.
   */
  fullHeight?: boolean
  /**
   * The onClick handler for the card component.
   */
  onClick?: () => void
}

export type TCardProps = TCardStylesProps & TMediaQueries<TCardStylesProps> & TStylesProps
