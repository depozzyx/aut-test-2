import styled, { css, CSSProperties, DefaultTheme } from 'styled-components'
import Mask from 'react-input-mask'
import {
  TStylesProps,
  propertyBreakpoints,
  styleToCss,
  formatCssProperty,
  TStyle,
} from '@peiko/styles'
import { TInputSizes } from './types'

type TInputCont = TStylesProps & {
  error?: string
  disabled?: boolean
  isStartAdornment?: boolean
  isEndAdornment?: boolean
  readOnly?: boolean
} & TInputSizes

const TRANSITION = '200ms'
const BORDER_WIDTH = 1
const BORDER_RADIUS = 4

const inputFont = (size: TInputSizes['size'], theme: DefaultTheme) => {
  switch (size) {
    case 'm':
      return theme.fonts.f8
    default:
      return theme.fonts.f8
  }
}

const containerSize = (size?: TInputSizes['size']) => {
  switch (size) {
    case 's':
      return css`
        height: 30px;
      `
    case 'm':
      return css`
        height: 36px;
      `
    case 'l':
      return css`
        height: 42px;
      `
    default:
      return css`
        height: 42px;
      `
  }
}

const iconSize = (size?: TInputSizes['size']) => {
  switch (size) {
    case 's':
      return css`
        width: 24px;
        height: 24px;
      `
    case 'l':
      return css`
        width: 28px;
        height: 28px;
      `
    default:
      return css`
        width: 24px;
        height: 24px;
      `
  }
}

export const Wrapper = styled.div<{ width: CSSProperties['width'] }>`
  position: relative;
  width: ${({ width }) => (width ? formatCssProperty(width) : '100%')};
`

export const InputContainer = styled.div<TInputCont>((props) => {
  const { theme, size, styles } = props
  const { palette } = props.theme

  const states = css`
    ${props.error &&
    css`
      border-color: ${palette.main13} !important;

      svg path {
        fill: ${palette.main13} !important;
        stroke: ${palette.main13} !important;
      }
    `}

    &:hover {
      border-color: ${!props.error && palette.main3};
    }

    &:focus {
      & button {
        background-color: transparent !important;
      }
      & svg path {
        fill: ${palette.main3} !important;
      }
    }

    ${props.disabled &&
    css`
      border-color: ${palette.main22} !important;
      background-color: ${palette.main20};
      pointer-events: none;

      & button {
        background-color: transparent !important;
      }

      & svg path {
        fill: ${palette.main5} !important;
      }
    `}
  `

  return css`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    position: relative;
    ${containerSize(size)}
    background-color: ${palette.base};
    border: ${BORDER_WIDTH}px solid ${props.error ? palette.main13 : palette.main21};
    border-radius: ${BORDER_RADIUS}px;
    caret-color: auto;
    transition: border ${TRANSITION} linear;
    pointer-events: ${props.readOnly ? 'none' : 'auto'};
    ${states}

    &:focus-within {
      border: ${BORDER_WIDTH}px solid ${palette.main2};
    }

    & > input {
      ${inputFont(props.size, theme)}
      &::placeholder {
        color: ${props.theme.palette.main22};
      }
    }

    svg {
      ${iconSize(size)}
    }

    svg path {
      fill: ${(props) => props.theme.palette.main3};
    }

    :focus-within {
      svg path {
        fill: ${(props) => props.theme.palette.main3};
      }
    }

    ${propertyBreakpoints<TInputCont['size']>({
      props: size,
      values: (value) =>
        css`
          ${containerSize(value)}
          & > input {
            ${inputFont(value, theme)}
          }
          svg {
            ${iconSize(value)}
          }
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})

export const baseInput = css`
  width: 100%;
  outline: none;
  height: 100%;
  padding: 4px 8px 4px 4px;
  border: none;
  background-color: unset;
  color: ${(props) => props.theme.palette.main5};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition-delay: 9999s;
  }

  &:read-only {
    pointer-events: none;
  }
`

const Adornment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`

export const StartAdornment = styled(Adornment)<{ startAdornmentStyles?: TStyle }>(
  (props) => {
    const { startAdornmentStyles, theme } = props

    return css`
      padding-left: 8px;
      ${startAdornmentStyles && styleToCss(startAdornmentStyles, theme)}
    `
  },
)

export const EndAdornment = styled(Adornment)<{ endAdornmentStyles?: TStyle }>(
  (props) => {
    const { endAdornmentStyles, theme } = props

    return css`
      padding-right: 8px;
      ${endAdornmentStyles && styleToCss(endAdornmentStyles, theme)}
    `
  },
)

export const Input = styled.input`
  ${baseInput}
`

export const InputMask = styled(Mask)`
  ${baseInput}
`
