import styled, { css } from 'styled-components'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'

const TRANSITION_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 0.2, 1)'
const TRANSITION_DURATION = `300ms`

export const Wrapper = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
`

export const TogleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Label = styled.label<{ checked: boolean; disabled?: boolean }>((props) => {
  const { checked, theme, disabled } = props
  const { palette } = theme

  return css`
    position: relative;
    width: 52px;
    height: 32px;
    background-color: ${checked ? palette.main2 : palette.main12};
    border-radius: 100px;
    transition-property: background-color;
    transition-duration: ${TRANSITION_DURATION};
    transition-timing-function: ${TRANSITION_TIMING_FUNCTION};

    &:focus {
      background: green;
    }

    ${disabled &&
    css`
      background-color: ${checked ? palette.main12 : palette.base4};
    `}
  `
})

export const ToogleButton = styled.span<{ checked?: boolean }>`
  position: absolute;
  pointer-events: none;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.main10};
  transition-property: transform, background-color, box-shadow;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  transform: ${({ checked }) => (checked ? 'translateX(20px)' : 'translateX(0)')};
`

export const Input = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:checked + ${ToogleButton} {
    background-color: ${({ theme }) => theme.palette.base200};
    transform: translateX(20px);
  }

  &:focus + ${ToogleButton} {
    box-shadow: 0 0 0px 8px
      ${({ theme, checked }) =>
        checked
          ? hexToRGBA(theme.palette.base200, 0.25)
          : hexToRGBA(theme.palette.main8, 0.15)};
  }

  &:disabled + ${ToogleButton} {
    background-color: ${({ theme }) => theme.palette.main12};
  }

  &:active + ${ToogleButton} {
    box-shadow: ${({ theme, disabled, checked }) =>
      disabled
        ? 'none'
        : `0 0 0px 10px ${
            checked
              ? hexToRGBA(theme.palette.base200, 0.25)
              : hexToRGBA(theme.palette.main8, 0.15)
          }`};
  }

  :disabled {
    pointer-events: none;
    + ${ToogleButton} {
      background-color: ${({ theme, checked }) =>
        checked ? theme.palette.base4 : theme.palette.main12};
    }
  }
`
