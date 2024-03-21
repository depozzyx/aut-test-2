import { useEffect, useCallback, useRef, MutableRefObject } from 'react'

type TReturn = {
  headerRef: MutableRefObject<HTMLDivElement | null>
}

export const useHeaderHeight = (): TReturn => {
  const headerRef = useRef<HTMLDivElement | null>(null)

  const setHeightDimension = useCallback(() => {
    if (!headerRef.current) return

    document.documentElement.style.setProperty(
      '--header-height',
      `${headerRef.current.offsetHeight}px`,
    )
  }, [])

  useEffect(() => {
    setHeightDimension()
    window.addEventListener('resize', setHeightDimension)

    return () => {
      window.removeEventListener('resize', setHeightDimension)
    }
  }, [])

  return { headerRef }
}
