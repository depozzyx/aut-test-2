import * as CSS from 'csstype'
import { DefaultTheme } from 'styled-components'
import { TMediaQueries } from './breakpoints'

type CSSPropertyFN = (theme: DefaultTheme) => CSS.Properties[keyof CSS.Properties]

type CssProps = {
  [K in keyof CSS.Properties]: CSS.Properties[K] | CSSPropertyFN
}

type CSSPseudos = { [K in CSS.Pseudos]?: CSS.Properties }
type TProperties = CssProps & CSSPseudos

export type TStyle = TProperties & TMediaQueries<TProperties>
