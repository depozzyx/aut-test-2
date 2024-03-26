import styled, { css, CSSProperties, DefaultTheme } from 'styled-components'
import Mask from 'react-input-mask'
import {
  TStylesProps,
  propertyBreakpoints,
  styleToCss,
  formatCssProperty,
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
const BORDER_WIDTH = 2
const BORDER_RADIUS = 8

const inputFont = (size: TInputSizes['size'], theme: DefaultTheme) => {
  switch (size) {
    case 'm':
      return theme.fonts.f5
    default:
      return theme.fonts.f5
  }
}

const containerSize = (size?: TInputSizes['size']) => {
  switch (size) {
    case 's':
      return css`
        height: 48px;
      `
    case 'm':
      return css`
        height: 52px;
      `
    case 'l':
      return css`
        height: 56px;
      `
    default:
      return css`
        height: 52px;
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
    &:hover {
      border-color: ${!props.error && palette.main11};
    }

    &:focus {
      & button {
        background-color: transparent !important;
      }
      & svg path {
        fill: ${palette.main11} !important;
      }
    }

    ${props.disabled &&
    css`
      border-color: ${palette.base2} !important;
      background-color: ${palette.base2};
      pointer-events: none;

      & button {
        background-color: transparent !important;
      }

      & svg path {
        fill: ${palette.main12} !important;
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
    background-color: ${palette.base3};
    border: ${BORDER_WIDTH}px solid ${props.error ? palette.main7 : palette.base3};
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
        color: ${props.theme.palette.main11};
      }
    }

    svg {
      ${iconSize(size)}
    }

    svg path {
      fill: ${(props) => props.theme.palette.main11};
    }

    :focus-within {
      svg path {
        fill: ${(props) => props.theme.palette.main8};
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
  padding: 10px 16px;
  border: none;
  background-color: unset;
  color: ${(props) => props.theme.palette.main8};

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

export const StartAdornment = styled(Adornment)`
  padding-left: 12px;
`

export const EndAdornment = styled(Adornment)`
  padding-right: 12px;
`

export const Input = styled.input`
  ${baseInput}
`

export const InputMask = styled(Mask)`
  ${baseInput}
`
