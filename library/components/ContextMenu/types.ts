import { PopupProps } from 'reactjs-popup/dist/types'

export type TRenderMenuProps = {
  onClose: () => void
  open: boolean
}

export type TContextMenu = Omit<PopupProps, 'children'> & {
  /**
   * `renderMenu` function is used to render the menu of the tooltip.
   *
   * Use this function with `customMenu` prop.
   *
   * `renderMenu` function accept `onClose` function as a prop. This can be used to close the tooltip manually.
   */
  renderMenu: (props: TRenderMenuProps) => JSX.Element
  /**
   * Stop scrolling of the body when the menu is open.
   */
  fixScroll?: boolean
  /**
   * Use this prop when you want to use your own menu.
   *
   * You can use `renderMenu` function to render your own menu.
   */
  customMenu?: boolean
  /**
   * Disable auto focus on the trigger.
   */
  disableAutoFocus?: boolean
  /**
   * Define custom z-index for the menu.
   */
  zIndex?: number
  /**
   * Define to show the arrow on the menu.
   */
  withArrow?: boolean
  /**
   * Define custom style for the arrow.
   */
  arrowStyle?: React.CSSProperties
}
