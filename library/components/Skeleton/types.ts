import { CSSProperties, DefaultTheme } from 'styled-components'

export type TSkeletonProps = {
  /**
   * The main color of the skeleton.
   *
   * @default base3
   */
  color?: keyof DefaultTheme['palette']
  /**
   * Define the width of the skeleton in pixels number or string.
   *
   */
  width?: CSSProperties['width']
  /**
   * Define the height of the skeleton in pixels number or string.
   *
   */
  height?: CSSProperties['height']
  /**
   * Define the border radius of the skeleton in pixels number or string.
   *
   */
  borderRadius?: CSSProperties['borderRadius']
}
