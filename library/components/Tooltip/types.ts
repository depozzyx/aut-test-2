import { PopupProps } from 'reactjs-popup/dist/types'
import { CSSProperties } from 'styled-components'

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
} & Omit<PopupProps, 'children'>
