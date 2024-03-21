import { DefaultTheme } from 'styled-components'
import { mediaQueries, mediaQueryWidthDown, mediaQueryWidthUp } from '../breakpoints'
import { TDefaultMediaQueries } from '../types/breakpoints'
import { CUSTOM_BREAKPOINT_DOWN_REG, CUSTOM_BREAKPOINT_UP_REG } from '../constants'
import { TStyle } from '../types/styles'

const breakpointsArr = Object.keys(mediaQueries)

const JSToCSS = (obj: TStyle, theme: DefaultTheme): string => {
  let css = ''

  const keys = Object.keys(obj) as Array<keyof TStyle>

  keys.forEach((key) => {
    if (key.includes(':')) {
      css += `&${key} { ${JSToCSS(obj[key] as TStyle, theme)}}\n`
      return
    }

    if (breakpointsArr.includes(key)) {
      const breakpoint = key as keyof TDefaultMediaQueries
      css += `${mediaQueries[breakpoint]} {
        ${JSToCSS(obj[breakpoint] as TStyle, theme)}
      }\n`
      return
    }

    if (CUSTOM_BREAKPOINT_UP_REG.test(key)) {
      const width = key.substring(1)
      css += `${mediaQueryWidthUp(width)} {
        ${JSToCSS(obj[key] as TStyle, theme)}
      }\n`
      return
    }

    if (CUSTOM_BREAKPOINT_DOWN_REG.test(key)) {
      const width = key.match(/\d+/)?.[0] as string
      css += `${mediaQueryWidthDown(Number(width))} {
        ${JSToCSS(obj[key] as TStyle, theme)}
      }\n`
      return
    }

    if (!obj[key]) return

    const property = obj[key]

    let propertyValue

    if (typeof property === 'function') {
      propertyValue = property(theme)
    } else {
      propertyValue = obj[key] as string
    }

    css += `${key.replace(
      /([A-Z])/g,
      (g) => `-${g[0].toLowerCase()}`,
    )}: ${propertyValue};\n`
  })

  return css
}

export const styleToCss = (styles: TStyle, theme: DefaultTheme): string =>
  JSToCSS(styles, theme)
