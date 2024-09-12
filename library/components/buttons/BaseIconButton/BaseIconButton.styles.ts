import styled, { css } from 'styled-components'
import { TIconButton } from '../types'
import {
  BUTTON_TRANSITION_DURATION,
  BUTTON_TRANSITION_TIMING_FUNCTION,
} from '../constants/animation'

export const Button = styled.button<TIconButton>(
  (props) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition-property: background-color, border-color, color, box-shadow;
    transition-duration: ${BUTTON_TRANSITION_DURATION};
    transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};

    svg path {
      transition-property: fill;
      transition-duration: ${BUTTON_TRANSITION_DURATION};
      transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};
    }

    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: none;
    }

    ${(props.active || props.disabled || props.isLoading) && `pointer-events: none;`}
  `,
)

export const ButtonLabel = styled.span`
  position: relative;
  line-height: 0;
`
