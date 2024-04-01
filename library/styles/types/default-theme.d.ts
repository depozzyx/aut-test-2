import 'styled-components'
import { TZIndex } from './z-index'
import { TShadow } from './shadow'
import { TPalette } from './palette'
import { TFonts } from './fonts'
import { TDefaultMediaQueries } from './breakpoints'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: TFonts
    palette: TPalette
    zIndex: TZIndex
    shadow: TShadow
    mediaQueries: TDefaultMediaQueries
  }
}
