import { TStylesProps, TMediaQueries } from '@peiko/styles'
import { DefaultTheme } from 'styled-components'

export type TAvatarProps = {
  /**
   * The size of the avatar in pixels.
   */
  size?: number | TMediaQueries<number>
  /**
   * The background color of the avatar.
   *
   * You can specify the color of the avatar according to the theme palette.
   *
   * @default main8
   */
  bgColor?: keyof DefaultTheme['palette']
  /**
   * The border radius of the avatar. Valid any CSS value.
   *
   * @default 50%
   */
  borderRadius?: number | string
  /**
   * The image source of the avatar. If `src` is provided, `alt` must also be provided.
   *
   * Use next image internally.
   *
   * If `src` is not provided, the avatar will be rendered as a skeleton.
   *
   * @default undefined
   */
  src?: string
  /**
   * The alt attribute of the avatar.
   *
   * @default undefined
   */
  alt?: string
  /**
   * The onClick handler of the avatar.
   *
   * @default undefined
   */
  onClick?: () => void
} & TStylesProps
