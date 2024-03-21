import React, { useRef, useCallback } from 'react'

type TElement = HTMLDivElement | null

type TRuturn = {
  stopScroll: (x: boolean) => void
  setContainerElem: (elem: TElement) => void
  containerRef: React.MutableRefObject<TElement>
}

type TUseScrollLock = () => TRuturn

const isContains = (elem: HTMLElement, containerElem: HTMLElement) =>
  elem === containerElem ? true : containerElem.contains(elem)

export const useScrollLock: TUseScrollLock = () => {
  const containerRef = useRef<TElement>(null)

  const isScrollElem = (e: Event) => {
    const containerElem = containerRef.current
    let elem = e.target as HTMLElement
    let hasScroll = false

    while (elem && containerElem && !hasScroll && isContains(elem, containerElem)) {
      hasScroll = elem.scrollHeight > elem.clientHeight + 1

      if (hasScroll) {
        elem.style.overscrollBehavior = 'none'
      }

      if (!elem.parentElement) return
      elem = elem.parentElement
    }

    return hasScroll
  }

  const onTouchmove = useCallback((e: Event) => {
    const hasScroll = isScrollElem(e)
    if (hasScroll) return
    e.preventDefault()
  }, [])

  const stopScroll = (stop: boolean) => {
    const { body } = document

    if (stop === true) {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth
      body.style.overflow = 'hidden'
      document.body.addEventListener('touchmove', onTouchmove, { passive: false })

      if (scrollWidth === 0) return

      body.style.paddingRight = `${scrollWidth}px`
      document.body.style.setProperty('--body-scroll-offset', `${scrollWidth}px`)

      return
    }
    body.style.paddingRight = ''
    document.body.style.setProperty('--body-scroll-offset', '0px')
    body.style.overflow = 'auto'
    document.body.removeEventListener('touchmove', onTouchmove)
  }

  const setContainerElem = (elem: TElement) => {
    containerRef.current = elem
  }

  return { stopScroll, setContainerElem, containerRef }
}
