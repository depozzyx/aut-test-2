import { TStylesProps, TDefaultMediaQueries } from '@peiko/styles'
import { DefaultTheme } from 'styled-components'

export type TRatingProps = {
  /**
   * Readonly mode. User cannot change the rating.
   */
  readonly?: boolean
  /**
   * Disabled mode. User cannot change the rating.
   */
  disabled?: boolean
  /**
   * The initial value of the rating.
   *
   * @default 3
   */
  initialValue?: number
  /**
   * The number of stars.
   *
   * @default 5
   */
  numberOfStars?: number
  /**
   * The size of the star icons. In pixels.
   *
   * @default 24
   */
  size?: number | Partial<TDefaultMediaQueries<number>>
  /**
   * Allow to rate with fractions. Not just integers.
   *
   * */
  allowFraction?: boolean
  /**
   * Add custom icons for the empty stars. Valid any ReactNode.
   */
  emptyIcon?: React.ReactNode
  /**
   * Add custom icons for the filled stars. Valid any ReactNode.
   */
  fillIcon?: React.ReactNode
  /**
   * The color of the rating.
   *
   * You can specify the color of the rating according to the theme palette.
   *
   * @default main8
   */
  color?: keyof DefaultTheme['palette']
  /**
   * The onChange handler of the rating.
   *
   * @type (rate: number) => void
   */
  onChange?: (rate: number) => void
} & TStylesProps
