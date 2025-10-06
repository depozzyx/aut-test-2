import { TModalNames } from '../constants'

export type TModal = {
  modalName: TModalNames
  isOpen: boolean
  // optional payload for contextual modals
  payload?: unknown
}
