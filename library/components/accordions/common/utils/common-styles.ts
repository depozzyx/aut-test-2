import { DefaultTheme, FlattenInterpolation, ThemeProps, css } from 'styled-components'
import { TContainer } from '../types'
import { TRANSITION_DURATION, TRANSITION_TIMING_FUNCTION } from '../constants'

type TColors = {
  bg?: string
  border?: string
  borderOpen?: string
  borderHover?: string
  borderFocus?: string
  borderDisabled?: string
  disabled?: boolean
} & TContainer

type TReturnColorsType = FlattenInterpolation<ThemeProps<DefaultTheme>>

export const baseContainer = css`
  cursor: pointer;
  border-style: solid;
  text-align: left;
  transition: border-color ${TRANSITION_DURATION} ${TRANSITION_TIMING_FUNCTION},
    padding ${TRANSITION_DURATION} ${TRANSITION_TIMING_FUNCTION};
  :disabled {
    pointer-events: none;
  }
`

export const baseCollapse = css`
  & .collapse {
    transition: height ${TRANSITION_DURATION} ${TRANSITION_TIMING_FUNCTION};
  }
`

export const colors = ({
  border,
  borderOpen,
  borderHover,
  borderFocus,
  borderDisabled,
  bg,
  isOpen,
  disabled,
}: TColors): TReturnColorsType => css`
  ${bg && `background-color: ${bg};`}
  ${border && `border-color: ${border};`}
  ${borderOpen && `border-color: ${isOpen ? borderOpen : border || 'transparent'};`}
  
  > * {
    opacity: ${disabled ? 0.4 : 1};
  }

  ${borderFocus &&
  !isOpen &&
  css`
    @media (-moz-touch-enabled: 0), (pointer: fine) {
      &:focus {
        border-color: ${borderFocus};
      }
    }
  `}

  ${borderHover &&
  !isOpen &&
  css`
    @media (-moz-touch-enabled: 0), (pointer: fine) {
      &:hover {
        border-color: ${borderHover};
      }
    }
  `}

  :disabled {
    border-color: ${borderDisabled};
  }
`
