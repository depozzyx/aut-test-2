import { DefaultTheme, FlattenSimpleInterpolation, css } from 'styled-components'

export const getButtonIconColor = (
  color: keyof DefaultTheme['palette'],
  theme: DefaultTheme,
): FlattenSimpleInterpolation => css`
  svg path {
    fill: ${theme.palette[color]};
  }
`
