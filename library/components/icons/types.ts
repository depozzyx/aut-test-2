import { CSSProperties, DefaultTheme } from 'styled-components'
import { TMediaQueries } from '@peiko/styles'

export type TDimensions = {
  /**
   * The width of the icon. Valid any CSS value.
   */
  width?: CSSProperties['width']
  /**
   * The height of the icon. Valid any CSS value.
   */
  height?: CSSProperties['height']
  /**
   * The size of the icon.
   *
   * @default m
   */
  size?: 'xs' | 's' | 'm' | 'ml' | 'l'
}

export type TIcon = {
  /**
   * The color of the icon.
   */
  color?: keyof DefaultTheme['palette']
  /**
   * You can add direction to the icon. Used in arrows for example.
   */
  direction?: 'left' | 'right' | 'up' | 'down'
  /**
   * The custom transition of the icon.
   */
  transition?: CSSProperties['transition']
} & TDimensions &
  TMediaQueries<TDimensions>
