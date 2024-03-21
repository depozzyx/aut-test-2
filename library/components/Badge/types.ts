import { TStylesProps, TMediaQueries } from '@peiko/styled'
import { DefaultTheme } from 'styled-components'

export type TBadgeProps = {
  /**
   * The content of the badge.
   *
   * Valid any ReactNode.
   *
   * @type React.ReactNode
   */
  children?: React.ReactNode
  /**
   * The background color of the badge.
   *
   * You can specify the color of the badge according to the theme palette.
   *
   * @default main8
   */
  color?: keyof DefaultTheme['palette']
  /**
   * The count to show in the badge.
   *
   * If count is 0, the badge will be show 0.
   *
   * If no count will be shown the dot.
   */
  count?: number
  /**
   * The maximum count to show.
   *
   * For example if count is 100 and maxCount is 99, the badge will show 99+.
   */
  maxCount?: number
  /**
   * The left position of the badge. You can specify it using CSS values.
   *
   * For example 10px, 10%, etc.
   */
  positionLeft?: string | TMediaQueries
  /**
   * The right position of the badge. You can specify it using CSS values.
   *
   * For example 10px, 10%, etc.
   */
  positionRight?: string | TMediaQueries
  /**
   * The tp[] position of the badge. You can specify it using CSS values.
   *
   * For example 10px, 10%, etc.
   */
  positionTop?: string | TMediaQueries
  /**
   * The bottom position of the badge. You can specify it using CSS values.
   *
   * For example 10px, 10%, etc.
   */
  positionBottom?: string | TMediaQueries
} & TStylesProps
