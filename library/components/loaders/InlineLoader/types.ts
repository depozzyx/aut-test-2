import { CSSProperties } from 'react'
import { DefaultTheme } from 'styled-components'

export type TInlineLoaderContainerProps = {
  /**
   * The color of the loader. Use colors from theme palette.
   */
  color?: keyof DefaultTheme['palette']
  /**
   * The color of the backgrpund. Use colors from theme palette.
   */
  bgColor?: keyof DefaultTheme['palette']
  /**
   * Custom top position of the loader. Valid CSS value.
   *
   * Used only if position is absolute or fixed
   */
  top?: CSSProperties['top']
  /**
   * Custom left position of the loader. Valid CSS value.
   *
   * Used only if position is absolute or fixed
   */
  left?: CSSProperties['left']
  /**
   * Define the position of the loader.
   *
   * @default relative
   */
  position?: CSSProperties['position']
  /**
   * Define the border radius of the loader in pixels number or string.
   *
   * @default 0
   */
  borderRadius?: CSSProperties['borderRadius']
  /**
   * Define the width of the loader in pixels number or string.
   *
   * @default 100%
   */
  width?: CSSProperties['width']
  /**
   * Define the height of the loader in pixels number or string.
   *
   * @default 4px
   */
  height?: CSSProperties['height']
}

export type TInlineLoader = {
  /**
   * @default false
   */
  loading?: boolean
  variant?: 'default' | 'table'
} & TInlineLoaderContainerProps
