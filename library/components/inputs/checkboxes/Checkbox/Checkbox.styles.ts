import { CSSProperties } from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { TCheckBoxProps } from './types'

const TRANSITION_MS = 200

export const Wrapper = styled.div``

const sizeStyle = (size: TCheckBoxProps['size']) => {
  switch (size) {
    case 's':
      return css`
        top: 3px;
        width: 18px;
        height: 18px;
      `
    case 'm':
      return css`
        width: 24px;
        height: 24px;
      `
    default:
      return css``
  }
}

const checkedDefaultStyle = (theme: DefaultTheme) => {
  const common = `
    content: '';
    display: block;
    position: absolute;
    background-color: ${theme.palette.main8};
    border-radius: 10px;
  `

  return css`
    &:before {
      ${common};
      transform: rotate(225deg);
    }

    &:after {
      ${common};
      transform: rotate(-45deg);
    }
  `
}

const determinateStyle = (theme: DefaultTheme) => {
  const common = `
    content: '';
    display: block;
    position: absolute;
    background-color: ${theme.palette.main8};
    border-radius: 10px;
  `

  return css`
    &:after {
      ${common};
      transform: rotate(0deg);
    }
  `
}

const sizeDeterminateStyle = (size: TCheckBoxProps['size']) => {
  const position = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
  switch (size) {
    case 's':
      return css`
        &:after {
          width: 10px;
          height: 2px;
          ${position};
        }
      `
    case 'm':
      return css`
        &:after {
          width: 13px;
          height: 2px;
          ${position};
        }
      `

    default:
      return css``
  }
}

const sizeCheckStyle = (size: TCheckBoxProps['size']) => {
  switch (size) {
    case 's':
      return css`
        &:before {
          top: 7.6px;
          left: 2.5px;
          width: 5px;
          height: 2px;
        }
        &:after {
          top: 6px;
          left: 4px;
          width: 10px;
          height: 2px;
        }
      `
    case 'm':
      return css`
        &:before {
          top: 10.6px;
          left: 2.8px;
          width: 8px;
          height: 2px;
        }
        &:after {
          top: 9px;
          left: 7px;
          width: 13px;
          height: 2px;
        }
      `

    default:
      return css``
  }
}

const targetBorderStyle = (color: CSSProperties['color']) => css`
  border: 2px solid ${color};
`

export const Target = styled.div``

export const LabelTarget = styled.label`
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;

  :focus-within {
    color: ${(props) => props.theme.palette.main2};
  }
`

export const LabelCont = styled.div<{ size?: TCheckBoxProps['size'] }>((props) => {
  const { size, theme } = props

  return css`
    color: ${theme.palette.main8};
    margin-left: 8px;
    position: relative;
    ${theme.fonts[size === 's' ? 'f7' : 'f5']}
  `
})

export const CheckBoxContainer = styled.div<{
  size: TCheckBoxProps['size']
  disabled: TCheckBoxProps['disabled']
  error: TCheckBoxProps['error']
  indeterminate: TCheckBoxProps['indeterminate']
}>(
  ({ theme, size, error, disabled, indeterminate }) => css`
    display: flex;
    align-items: flex-start;

    input {
      opacity: 0;
      height: 0;
      width: 0;
    }

    :hover {
      ${Target} {
        color: ${error ? theme.palette.main7 : theme.palette.main2};
        ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
        box-shadow: 0 0 0px 4px ${(props) => props.theme.palette.base};
      }
    }

    ${Target} {
      display: inline-flex;
      flex-shrink: 0;
      box-sizing: border-box;
      position: relative;
      border-radius: 4px;
      ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main8)}
      ${sizeStyle(size)};

      &:hover {
        ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
      }

      transition: background-color ${TRANSITION_MS}ms, border-color ${TRANSITION_MS}ms,
        box-shadow ${TRANSITION_MS}ms;
    }

    input {
      &:focus ~ ${Target} {
        box-shadow: 0 0 0px 4px ${(props) => props.theme.palette.base};
        ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
      }

      &:checked {
        & ~ ${Target} {
          background-color: ${error ? theme.palette.main7 : theme.palette.main2};
          ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
          ${checkedDefaultStyle(theme)};
          ${sizeCheckStyle(size)};

          &:hover {
            background-color: ${error ? theme.palette.main7 : theme.palette.main2};
            ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
          }
        }

        &:focus ~ ${Target} {
          ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
          background-color: ${error ? theme.palette.main7 : theme.palette.main2};

          &:hover {
            ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
            background-color: ${error ? theme.palette.main7 : theme.palette.main2};
          }
        }
      }

      &:disabled {
        & ~ ${Target} {
          pointer-events: none;
          ${targetBorderStyle(theme.palette.main12)}
        }
        &:checked ~ ${Target} {
          background-color: ${theme.palette.main12};
          ${targetBorderStyle(theme.palette.main12)}
        }
      }
    }

    ${indeterminate &&
    css`
      ${Target} {
        background-color: ${error ? theme.palette.main7 : theme.palette.main2};
        ${targetBorderStyle(error ? theme.palette.main7 : theme.palette.main2)}
        ${determinateStyle(theme)}
          ${sizeDeterminateStyle(size)}
      }

      input {
        &:disabled {
          & ~ ${Target} {
            background-color: ${theme.palette.main12};
            ${targetBorderStyle('transparent')}
          }
        }
      }
    `}

    ${disabled &&
    css`
      pointer-events: none;
      ${LabelCont} {
        color: ${theme.palette.main12};
      }
    `}
  `,
)
