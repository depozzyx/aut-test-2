import { ToastOptions } from 'react-toastify'

export type TToastProps = {
  /**
   * Unique id of the toast.
   */
  id: string
  /**
   * Toast is controlled component. You need to specify the open state of the toast.
   */
  open: boolean
  /**
   * In case if you need undo functionality, you can specify the undo function.
   */
  undoFn?: () => void
} & ToastOptions
