import { useEffect, useCallback } from 'react'
import { WINDOW_HEIGHT } from '@peiko/constants/css'

export const useWindowHeight = (): void => {
  const setHeightDimension = useCallback(() => {
    const { clientHeight } = document.documentElement
    const { innerHeight } = window

    const viewportHeight = window.visualViewport?.height
    const height = clientHeight < innerHeight ? innerHeight : clientHeight

    const windowHeight = `${viewportHeight || height}px`

    document.documentElement.style.setProperty(`${WINDOW_HEIGHT}`, windowHeight)
  }, [])

  useEffect(() => {
    setHeightDimension()
    window.addEventListener('resize', setHeightDimension)

    return () => {
      window.removeEventListener('resize', setHeightDimension)
    }
  }, [])
}
