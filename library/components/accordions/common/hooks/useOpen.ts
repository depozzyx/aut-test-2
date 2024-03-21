import { useCallback, useRef, useState } from 'react'

type TReturn = {
  isOpen: boolean
  handleClick: () => void
  ref: React.MutableRefObject<HTMLButtonElement | null>
  setBlure: () => void
}

export const useOpen = (defaultOpen: boolean): TReturn => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const ref = useRef<HTMLButtonElement>(null)

  const setBlure = useCallback(() => {
    if (!ref.current) return
    ref.current.blur()
  }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, handleClick, ref, setBlure }
}
