import { TDefaultBreakpoints, TDefaultMediaQueries } from './types/breakpoints'

export const breakpoints: TDefaultBreakpoints<number> = {
  xs: 0,
  sm: 720,
  md: 1024,
  lg: 1440,
}

export const mediaQueries: TDefaultMediaQueries = {
  xs: `@media screen and (min-width: ${breakpoints.xs}px)`,
  sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
  md: `@media screen and (min-width: ${breakpoints.md}px)`,
  lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
  xsDown: `@media screen and (max-width: ${breakpoints.xs - 1}px)`,
  smDown: `@media screen and (max-width: ${breakpoints.sm - 1}px)`,
  mdDown: `@media screen and (max-width: ${breakpoints.md - 1}px)`,
  lgDown: `@media screen and (max-width: ${breakpoints.lg - 1}px)`,
}

export const mediaQueryWidthUp = (width: string): string =>
  `@media screen and (min-width: ${width}px)`

export const mediaQueryWidthDown = (width: number): string =>
  `@media screen and (max-width: ${width - 1}px)`
