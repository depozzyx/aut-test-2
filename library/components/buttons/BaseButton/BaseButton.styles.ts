import styled, { css } from 'styled-components'
import { TButton } from '../types'
import {
  BUTTON_TRANSITION_DURATION,
  BUTTON_TRANSITION_TIMING_FUNCTION,
} from '../constants/animation'

export const LoaderCont = styled.div`
  display: inline-flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Button = styled.button<TButton>(
  (props) => css`
    cursor: pointer;
    position: relative;
    width: ${props.width ?? 'fit-content'};
    max-width: ${props.maxWidth ?? 'none'};
    display: inline-flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    transition-property: color, border, background-color, box-shadow;
    transition-duration: ${BUTTON_TRANSITION_DURATION};
    transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};
    pointer-events: ${props.isLoading || props.disabled ? 'none' : 'auto'};
    outline: none;
  `,
)

export const Buttonlabel = styled.span<{ opacity: number }>`
  position: relative;
  z-index: 1;
  opacity: ${(props) => props.opacity};
  white-space: nowrap;
`
