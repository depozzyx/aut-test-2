import styled, { css } from 'styled-components'
import { DayPicker } from 'react-day-picker'

export const BUTTON_TRANSITION_DURATION = '0.25s'
export const BUTTON_TRANSITION_TIMING_FUNCTION = 'cubic-bezier(.4,0,.2,1)'

export const StyledDayPicker = styled(DayPicker)((props) => {
  const { theme } = props
  const { palette, fonts } = theme

  return css`
    margin: 0;

    .rdp-caption_label {
      ${fonts.f4}
      color: ${palette.main8};
    }

    .rdp-head_cell {
      ${fonts.f7}
      color: ${palette.main8};
    }

    .rdp-button {
      ${fonts.f7}
      color: ${palette.main8};
      transition-property: color, background-color;
      transition-duration: ${BUTTON_TRANSITION_DURATION};
      transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};
    }

    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: ${palette.base200};
    }

    .rdp-button:active:not([disabled]):not(.rdp-day_selected) {
      background-color: ${palette.base};
    }

    .rdp-button:focus-visible:not([disabled]) {
      color: ${palette.main8};
      background-color: ${palette.base200};
      border: none;
      outline: none;
    }

    .rdp-day_selected:focus-visible {
      background-color: ${palette.main2};
    }

    .rdp-day_selected {
      color: ${palette.base} !important;
      background-color: ${palette.main2} !important;
    }
  `
})
