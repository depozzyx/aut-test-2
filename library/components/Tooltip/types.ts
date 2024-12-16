import { PopupProps } from 'reactjs-popup/dist/types'
import { CSSProperties, DefaultTheme } from 'styled-components'

type TRenderMenuProps = {
  onClose: () => void
  className?: string
}

export type TTooltipProps = {
  /**
   * `renderMenu` function is used to render the menu of the tooltip.
   *
   * `renderMenu` function accept `onClose` function as a prop. This can be used to close the tooltip manually.
   */
  renderMenu?: (props: TRenderMenuProps) => JSX.Element
  /**
   * Define the width of the tooltip in pixels number or string.
   * @default 100%
   */
  maxWidth?: CSSProperties['maxWidth']
  /**
   * Define the background color of the tooltip content.
   * @default base3
   */
  padding?: CSSProperties['padding']
  /**
   * Define the padding of the tooltip content.
   * @default '16px 24px'
   */
  contentBackgroundColor?: keyof DefaultTheme['palette']
  /**
   * Define the color of the tooltip arrow.
   * @default base3
   */
  arrowColor?: keyof DefaultTheme['palette']
  /**
   * Define the border color of the tooltip content.
   * @default main8
   */
  contentBorderColor?: keyof DefaultTheme['palette']
} & Omit<PopupProps, 'children'>
