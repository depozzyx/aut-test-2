import { FlattenSimpleInterpolation, css } from 'styled-components'
import { mediaQueries, mediaQueryWidthDown, mediaQueryWidthUp } from '../breakpoints'
import { CUSTOM_BREAKPOINT_DOWN_REG, CUSTOM_BREAKPOINT_UP_REG } from '../constants'
import { TDefaultMediaQueries, TMediaQueries } from '../types/breakpoints'

type TProps<T> = {
  props?: TMediaQueries<T> | T
  values: (value: T) => FlattenSimpleInterpolation
}

export const propertyBreakpoints = <T>({
  props,
  values,
}: TProps<T>): FlattenSimpleInterpolation => {
  if (!props) return []

  if (typeof props !== 'object')
    return css`
      ${values(props)}
    `

  const propsCopy = props as TMediaQueries<T>

  const queries = (Object.keys(propsCopy) as Array<keyof TMediaQueries>).filter(
    (item) => {
      if (
        Object.keys(mediaQueries).includes(item) ||
        CUSTOM_BREAKPOINT_UP_REG.test(item) ||
        CUSTOM_BREAKPOINT_DOWN_REG.test(item)
      ) {
        return true
      }
      return false
    },
  )

  if (!queries.length) return []

  return queries.map((query) => {
    const value = propsCopy[query]

    if (Object.keys(mediaQueries).includes(query)) {
      return css`
        ${mediaQueries[query as keyof TDefaultMediaQueries]} {
          ${values(value as T)}
        }
      `
    }

    if (CUSTOM_BREAKPOINT_UP_REG.test(query)) {
      const width = query.substring(1)
      return css`
        ${mediaQueryWidthUp(width)} {
          ${values(value as T)}
        }
      `
    }

    if (CUSTOM_BREAKPOINT_DOWN_REG.test(query)) {
      const width = query.match(/\d+/)?.[0]
      return css`
        ${mediaQueryWidthDown(Number(width))} {
          ${values(value as T)}
        }
      `
    }

    return ''
  })
}
