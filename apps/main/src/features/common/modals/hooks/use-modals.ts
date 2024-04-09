import { useRedux } from '@/hooks/use-redux'
import { TModal } from '../types'
import { modalsActions, selectModal } from '../store'

type TModalsReturn = {
  setModal: ({ modalName, isOpen }: TModal) => void
  modalState: TModal | null
  resetModals: () => void
}

function useModals(): TModalsReturn {
  const { select, dispatch } = useRedux()

  const setModal = ({ modalName, isOpen }: TModal) => {
    dispatch(modalsActions.setModal({ modalName, isOpen }))
  }

  const resetModals = () => {
    dispatch(modalsActions.resetModalsState())
  }

  const { modalState } = select(selectModal)

  return {
    modalState,
    setModal,
    resetModals,
  }
}

export default useModals
