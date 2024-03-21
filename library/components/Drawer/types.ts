export type TDrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export type TDrawerProps = {
  /**
   * If `true`, the drawer is open
   * @default false
   * @type boolean
   */
  open: boolean
  /**
   * Drawer position
   * @default 'left'
   * @type 'left' | 'right' | 'top' | 'bottom'
   */
  position?: TDrawerPosition
  /** Callback fired when drawer is closed */
  onClose: () => void
  /** disable scroll behavior of page
   * scroll will be locked when drawer is open
   * scroll inside drawer will not be affected
   * @default true
   * @type boolean
   */
  lockScroll?: boolean
  /** If `true`, backdrop will not be rendered
   * @default false
   * @type boolean
   */
  hideBackdrop?: boolean
  /**
   * If `true`, the drawer will take up the full height and width of brodser screen
   * @default false
   * @type boolean
   */
  fullScreen?: boolean
  /**
   * If `true`, animation will be disabled
   * @default false
   * @type boolean
   */
  disableAnimation?: boolean
}
