import { CSSProperties } from 'styled-components'

export type TModalProps = {
  /**
   * Modal is controlled component. You need to specify the open state of the modal.
   */
  open: boolean
  /**
   * when this function is passed, the modal can be closed by clicking close icon or outside the modal
   * @returns void
   */
  onClose?: () => void
  /**
   * Specify the max width of the modal. Otherwise it will be 100% of the screen width.
   */
  maxWidth?: CSSProperties['maxWidth']
  /**
   * triggers when the modal is closed by clicking outside of the modal
   * @default true
   */
  disableCloseOutside?: boolean
  /**
   * hide close button even when onClose is passed
   * @default false
   */
  hideCloseButton?: boolean
  /**
   * Specify the width of the modal. Otherwise it will be 100% of the screen width.
   */
  containerWidth?: CSSProperties['width']

  children?: React.ReactNode
  left?: string
  position?: CSSProperties['position']
}
