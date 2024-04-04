import { useRef, useCallback } from 'react'

/**
 * useToggleStyle hook to toggle a specific style on a targeted element.
 *
 * @param {string} selector - CSS selector (id is recommended for a single element).
 * @param {string} styleProperty - The CSS property to change (e.g., 'backgroundColor').
 * @param {string} newValue - The new value to apply to the styleProperty.
 * @returns {Object} - Object containing two functions: applyStyle and resetStyle.
 */

type TReturn = {
  applyStyle: () => void
  resetStyle: () => void
}

type TParams = {
  selector: string
  styleProperty: string
  newValue: string
}

function useToggleStyle({ selector, styleProperty, newValue }: TParams): TReturn {
  const originalValueRef = useRef<string | null>(null)

  const applyStyle = useCallback(() => {
    const element = document.querySelector(selector) as HTMLElement | null
    if (element) {
      const computedStyle = window.getComputedStyle(element)
      originalValueRef.current =
        originalValueRef.current ?? computedStyle.getPropertyValue(styleProperty)

      element.style.setProperty(styleProperty, newValue)
    }
  }, [selector, styleProperty, newValue])

  const resetStyle = useCallback(() => {
    const element = document.querySelector(selector) as HTMLElement | null
    if (element && originalValueRef.current !== null) {
      element.style.setProperty(styleProperty, originalValueRef.current)
    }
  }, [selector, styleProperty])

  return { applyStyle, resetStyle }
}

export default useToggleStyle
