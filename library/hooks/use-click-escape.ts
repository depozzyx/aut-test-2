import { useEffect } from 'react'

type TUseClickEscapeFunction = (condition: boolean, callBack: () => void) => void

export const useClickEscape: TUseClickEscapeFunction = (condition, callBack) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callBack()
    }
  }

  useEffect(() => {
    if (!condition) {
      return
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [condition])
}
