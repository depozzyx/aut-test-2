import { breakpoints } from '@peiko/styled'
import { useEffect, useState } from 'react'
import { debounce } from 'throttle-debounce'

type TSizes = keyof typeof breakpoints

// У нас новый механизм media query, который позволяет задавать размеры для разных брейкпоинтов
// Стоит здесь синхронизировать типизацию с тем, что мы используем в теме
type TReturn = {
  biggerThan: (x: TSizes) => boolean | null
  breakpoint: TSizes | null
  size: number | null
}

type TResolution = {
  breakpoint: TSizes | null
  size: number | null
}

// TODO: debounce timer option. By default 200ms
export const useResolution = (): TReturn => {
  const [resolution, setResolution] = useState<TResolution>({
    breakpoint: null,
    size: null,
  })

  const getDevice = debounce(200, () => {
    const size = window.innerWidth

    if (size >= breakpoints.lg) {
      setResolution({ size, breakpoint: 'lg' })
      return
    }

    if (size > breakpoints.md) {
      setResolution({ size, breakpoint: 'md' })
      return
    }

    if (size >= breakpoints.sm) {
      setResolution({ size, breakpoint: 'sm' })
      return
    }

    if (size >= breakpoints.xs) {
      setResolution({ size, breakpoint: 'xs' })
    }
  })

  const biggerThan = (breakpoint: TSizes) =>
    resolution.size !== null ? window.innerWidth > breakpoints[breakpoint] : null

  // TODO: посмотреть можем ли мы использовать здесь ResizeObserver api
  useEffect(() => {
    getDevice()
    window.addEventListener('resize', getDevice)
    return () => {
      window.removeEventListener('resize', getDevice)
    }
  }, [])

  return { biggerThan, ...resolution }
}
