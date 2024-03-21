import { CSSProperties } from 'react'
import { TMediaQueries } from '@peiko/styled'

export type TAdaptive = {
  /** The visible on the display by breakpoints
   *
   * Keys are breakpoints
   *
   * Values are display variants (none, block, etc.)
   */
  visible: CSSProperties['display'] | TMediaQueries<CSSProperties['display']>
}
