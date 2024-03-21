import { DefaultTheme } from 'styled-components'
import { mediaQueries } from './breakpoints'
import { zIndex } from './z-index'
import { shadow } from './shadow'
import { palette, darktPalete } from './palette'
import { fonts } from './fonts'

export type TTheme = 'light' | 'dark'

type TTheming = Record<TTheme, DefaultTheme>

const theme = {
  zIndex,
  shadow,
  fonts,
  mediaQueries,
}

export const theming: TTheming = {
  light: {
    palette,
    ...theme,
  },
  dark: {
    palette: {
      ...palette,
      ...darktPalete,
    },
    ...theme,
  },
}
