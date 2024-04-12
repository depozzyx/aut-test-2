import { useRedux } from '@/hooks/use-redux'
import { useCallback } from 'react'
import { TModal } from '../types'
import { modalsActions, selectModal } from '../store'

type TModalsReturn = {
  setModal: ({ modalName, isOpen }: TModal) => void
  modalState: TModal | null
  resetModals: () => void
}

function useModals(): TModalsReturn {
  const { select, dispatch } = useRedux()
  const { modalState } = select(selectModal)

  const setModal = useCallback(
    ({ modalName, isOpen }: TModal) => {
      dispatch(modalsActions.setModal({ modalName, isOpen }))
    },
    [modalState],
  )

  const resetModals = useCallback(() => {
    dispatch(modalsActions.resetModalsState())
  }, [modalState])

  return {
    modalState,
    setModal,
    resetModals,
  }
}

export default useModals
