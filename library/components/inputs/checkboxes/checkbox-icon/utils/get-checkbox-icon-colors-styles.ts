import { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components'

type TColors = {
  bg?: string
  icon?: string
}

type TReturnColorsType = FlattenInterpolation<ThemeProps<DefaultTheme>>

export const checkboxIconColors = (colors: TColors): TReturnColorsType => {
  const { icon, bg } = colors

  return css`
    > div {
      background-color: ${bg};

      svg path {
        fill: ${icon};
      }
    }
  `
}

export const checkboxIconHoverColors = (props: TColors): TReturnColorsType => css`
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:hover {
      ${checkboxIconColors(props)}
    }
  }
`

export const checkboxIconPressedColors = (props: TColors): TReturnColorsType => css`
  &:active {
    ${checkboxIconColors(props)}
  }
`

export const checkboxIconDisabledColors = (props: TColors): TReturnColorsType => css`
  pointer-events: none;
  ${checkboxIconColors(props)}
`
