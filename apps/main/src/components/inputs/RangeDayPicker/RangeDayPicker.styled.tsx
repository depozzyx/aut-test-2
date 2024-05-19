import { forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { DayPicker } from 'react-day-picker'
import useTranslation from 'next-translate/useTranslation'
import { CalendarIcon } from '@peiko/components/icons/CalendarIcon'
import { FilledButton } from '@peiko/components/buttons/FilledButton'

export const BUTTON_TRANSITION_DURATION = '0.25s'
export const BUTTON_TRANSITION_TIMING_FUNCTION = 'cubic-bezier(.4,0,.2,1)'

export const StyledRangeDayPicker = styled(DayPicker)((props) => {
  const { theme } = props
  const { palette, fonts } = theme

  return css`
    margin: 0;

    .rdp-caption_label {
      ${fonts.f6}
      color: ${palette.main5};
    }

    .rdp-head_cell {
      ${fonts.f11}
      color: ${palette.main5};
    }

    .rdp-button {
      ${fonts.f8}
      color: ${palette.main5};
      transition-property: color, background-color;
      transition-duration: ${BUTTON_TRANSITION_DURATION};
      transition-timing-function: ${BUTTON_TRANSITION_TIMING_FUNCTION};
      border-radius: 8px;
      width: 32px;
      height: 32px;
    }

    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: ${palette.main3};
      color: ${palette.base};
    }

    .rdp-button:active:not([disabled]):not(.rdp-day_selected) {
      background-color: ${palette.base};
      color: ${palette.main5};
    }

    .rdp-button:focus-visible:not([disabled]) {
      color: ${palette.main5};
      background-color: ${palette.main10};
      border: none;
      outline: none;
    }

    .rdp-day_selected:focus-visible {
      background-color: ${palette.main2};
    }

    .rdp-day_selected {
      color: ${palette.main5} !important;
      background-color: ${palette.base4} !important;
    }
  `
})

const StyledFilledButton = styled(FilledButton)(
  ({ active, theme }) => css`
    border-radius: 4px !important;
    background-color: ${theme.palette.base};
    color: ${theme.palette.main4};
    border: 1px solid ${theme.palette.main10};
    padding: 8px;
    ${theme.fonts.f8}

    svg {
      width: 24px !important;
      height: 24px !important;

      path {
        fill: ${theme.palette.main4};
      }
    }

    ${active &&
    css`
      background-color: ${theme.palette.base4};
      border-color: ${theme.palette.main3};
    `}

    &:hover {
      background-color: ${theme.palette.base4};
    }
  `,
)

type TCustomFilledBtnProps = {
  title?: string
  isActive?: boolean
}

export const CustomFilledBtn = forwardRef<HTMLButtonElement, TCustomFilledBtnProps>(
  (props, ref) => {
    const { t } = useTranslation('datepicker')
    const { title, isActive, ...rest } = props

    return (
      <StyledFilledButton
        ref={ref}
        size="s"
        endIcon={<CalendarIcon />}
        active={isActive}
        {...rest}
      >
        {title || t('date')}
      </StyledFilledButton>
    )
  },
)

CustomFilledBtn.displayName = 'CustomFilledBtn'
