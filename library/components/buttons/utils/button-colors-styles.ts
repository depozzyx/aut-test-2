import { DefaultTheme, FlattenInterpolation, ThemeProps, css } from 'styled-components'
import {
  BUTTON_TRANSITION_DURATION,
  BUTTON_TRANSITION_TIMING_FUNCTION,
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

const gradienButtonColor = (gradientColor: string) => css`
  &:before {
    position: absolute;
    content: '';
    inset: 0;
    opacity: 1;
    border-radius: inherit;
    transition-property: opacity;
    transition-duration: ${BUTTON_TRANSITION_DURATION};
    transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};
    background: ${gradientColor};
  }

  &:hover::before,
  &:active::before {
    opacity: 0;
  }

  &:focus::before {
    opacity: 0;
  }
  &:disabled::before {
    opacity: 0;
  }
`

export const buttonBaseColors = (colors: TColors): TReturnColorsType => {
  const { color, icon, bg, border, outline, gradient } = colors

  return css`
    color: ${color};
    background-color: ${bg};
    border-color: ${border};
    background: ${bg};

    svg path {
      fill: ${icon};
    }

    ${outline && `box-shadow: 0 0 0 4px ${outline};`}

    ${gradient && gradienButtonColor(gradient)}
  `
}

export const buttonHoverColors = (props: TColors): TReturnColorsType => css`
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:hover {
      ${buttonBaseColors(props)}
    }
  }
`

export const buttonFocusColors = (props: TColors): TReturnColorsType => css`
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    &:focus {
      ${buttonBaseColors(props)}
    }
  }
`

export const buttonPressedColors = (props: TColors): TReturnColorsType => css`
  &:active {
    ${buttonBaseColors(props)}
  }
`

export const buttonDisabledColors = (props: TColors): TReturnColorsType => css`
  &:disabled {
    ${buttonBaseColors(props)}
  }
`

export const buttonActiveColors = (props: TColors): TReturnColorsType => css`
  ${buttonBaseColors(props)}
`

export const buttonLoadingColors = (props: TColors): TReturnColorsType => css`
  ${buttonBaseColors(props)}
  ${buttonFocusColors(props)}
  ${buttonPressedColors(props)}
`
