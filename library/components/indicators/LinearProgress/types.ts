import { CSSProperties, DefaultTheme } from 'styled-components'

export type TLinearProgressProps = {
  /**
   * Define the height of the loader in pixels number or string.
   *
   * @default 4px
   */
  height?: CSSProperties['height']
  /**
   * Define the width of the loader in pixels number or string.
   *
   * @default 100%
   */
  width?: CSSProperties['width']
  /**
   * The progress in numbers. From 0 to 100.
   *
   * @default 0
   */
  progress: number
  /**
   * The main color of the loader. Use colors from theme palette.
   * @default primary
   * */
  color?: keyof DefaultTheme['palette']
  /**
   * The border radius of the loader.
   * @default base3
   * */
  borderRadius?: CSSProperties['borderRadius']
}
