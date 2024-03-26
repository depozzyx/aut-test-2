import styled, { css, CSSProperties, DefaultTheme } from 'styled-components'
import {
  TStylesProps,
  propertyBreakpoints,
  styleToCss,
  formatCssProperty,
} from '@peiko/styles'
import { TTextAreaSizes } from './types'

type TTextAreaCont = TStylesProps & {
  error?: string
  disabled?: boolean
  resize?: boolean
} & TTextAreaSizes

const TRANSITION = '200ms'
const BORDER_WIDTH = 2
const BORDER_RADIUS = 8

const textAreaFont = (size: TTextAreaSizes['size'], theme: DefaultTheme) => {
  switch (size) {
    case 'm':
      return theme.fonts.f5
    default:
      return theme.fonts.f5
  }
}

const containerSize = (size?: TTextAreaSizes['size']) => {
  switch (size) {
    case 's':
      return css`
        height: 150px;
      `
    case 'm':
      return css`
        height: 200px;
      `
    case 'l':
      return css`
        height: 250px;
      `
    default:
      return css`
        height: 200px;
      `
  }
}

export const Wrapper = styled.div<{ width: CSSProperties['width'] }>`
  position: relative;
  width: ${({ width }) => (width ? formatCssProperty(width) : '100%')};
`

export const TextArea = styled.textarea<TTextAreaCont>(
  ({ theme, size, error, resize, disabled, styles }) => css`
    width: 100%;
    outline: none;
    padding: 10px 16px;
    color: ${(props) => props.theme.palette.main8};
    ${containerSize(size)}
    background-color: ${theme.palette.base3};
    border: ${BORDER_WIDTH}px solid ${error ? theme.palette.main7 : theme.palette.base3};
    border-radius: ${BORDER_RADIUS}px;
    caret-color: auto;
    transition: border ${TRANSITION} linear;
    resize: ${resize ? 'both' : 'none'};

    &:hover {
      border-color: ${!error && theme.palette.main11};
    }

    ${disabled &&
    css`
      border-color: ${theme.palette.base2} !important;
      background-color: ${theme.palette.base2};
      pointer-events: none;
    `}

    &:focus-within {
      border: ${BORDER_WIDTH}px solid ${theme.palette.main2};
    }

    &::placeholder {
      color: ${theme.palette.main11};
    }

    ${propertyBreakpoints<TTextAreaCont['size']>({
      props: size,
      values: (value) =>
        css`
          ${containerSize(value)}
          ${textAreaFont(value, theme)}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `,
)
