import { useCallback, useRef, useState, MutableRefObject } from 'react'

type TReturn = {
  isOpen: boolean
  toggle: () => void
  ref: MutableRefObject<HTMLButtonElement | null>
  setBlur: () => void
}

export const useOpen = (defaultOpen: boolean): TReturn => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const ref = useRef<HTMLButtonElement>(null)

  const setBlur = useCallback(() => {
    if (!ref.current) return
    ref.current.blur()
  }, [])

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, toggle, ref, setBlur }
}
