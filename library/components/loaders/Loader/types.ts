import { CSSProperties, DefaultTheme } from 'styled-components'
import { TStylesProps } from '@peiko/styles'
import { TIcon } from '@peiko/components/icons'

export type TLoaderProps = {
  /**
   * The main color of the loader. Use colors from theme palette.
   */
  color?: keyof DefaultTheme['palette']
  /**
   * The size of the loader.
   *
   * @default 24px
   */
  size?: TIcon['size']
  /**
   * have priority over size
   */
  width?: CSSProperties['width']
  /**
   * Custom height of the loader.
   *
   * Have priority over size
   */
  height?: CSSProperties['height']
  /**
   * Custom position of the loader. Valid CSS value.
   */
  position?: CSSProperties['position']
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
   * Add label to loader
   */
  label?: string
  /**
   * Define the label placement.
   */
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
} & TStylesProps
