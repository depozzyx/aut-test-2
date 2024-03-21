import { DefaultTheme, FlattenInterpolation, ThemeProps, css } from 'styled-components'
import {
  CHIP_TRANSITION_DURATION,
  CHIP_TRANSITION_TIMING_FUNCTION,
} from '../constants/animation'

type TColors = {
  color?: string
  bg?: string
  icon?: string
  border?: string
  outline?: string
  gradient?: string
}

type TReturnColorsType = FlattenInterpolation<ThemeProps<DefaultTheme>>

const gradientChipColor = (gradientColor: string) => css`
  &:before {
    position: absolute;
    content: '';
    inset: 0;
    opacity: 1;
    border-radius: inherit;
    transition-property: opacity;
    transition-duration: ${CHIP_TRANSITION_DURATION};
    transition-timing-function: ${CHIP_TRANSITION_TIMING_FUNCTION};
    background: ${gradientColor};
  }

  &:hover::before,
  &:active::before {
    opacity: 0;
  }

  &:disabled::before {
    opacity: 0;
  }
`

export const chipBaseColors = (colors: TColors): TReturnColorsType => {
  const { color, icon, bg, border, outline, gradient } = colors

  return css`
    color: ${color};
    border-color: ${border};
    background: ${bg};

    svg path {
      fill: ${icon};
    }

    ${outline && `box-shadow: 0 0 0 4px ${outline};`}

    ${gradient && gradientChipColor(gradient)}
  `
}

export const chipHoverColors = (props: TColors): TReturnColorsType => css`
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:hover {
      ${chipBaseColors(props)}
    }
  }
`

export const chipFocusColors = (props: TColors): TReturnColorsType => css`
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:focus {
      ${chipBaseColors(props)}
    }
  }
`

export const chipPressedColors = (props: TColors): TReturnColorsType => css`
  &:active {
    ${chipBaseColors(props)}
  }
`

export const chipDisabledColors = (props: TColors): TReturnColorsType => css`
  pointer-events: none;
  ${chipBaseColors(props)}
`
