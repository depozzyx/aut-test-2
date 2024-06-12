import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { getButtonFont } from '@peiko/components/buttons/utils/get-button-font'
import { getIconButtonSize } from '@peiko/components/buttons/utils/get-icon-button-size'
import { getIconSize } from '@peiko/components/buttons/utils/get-icon-size'
import {
  TColors,
  buttonActiveColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonFocusColors,
  buttonHoverColors,
  buttonPressedColors,
} from '@peiko/components/buttons/utils/button-colors-styles'
import { TDefaultPalette } from '@peiko/styles/types/palette'

type TButtonStates = 'base' | 'focus' | 'hover' | 'pressed' | 'disabled' | 'active'
type TStatus = 'success' | 'failure'

const statusColors = (
  palette: TDefaultPalette,
): {
  [key in TStatus]: {
    [key in TButtonStates]: TColors
  }
} => ({
  success: {
    base: {
      color: palette.main11,
      border: palette.main11,
      icon: palette.main11,
    },
    focus: {
      color: palette.main26,
      border: palette.main26,
      icon: palette.main26,
    },
    hover: {
      color: palette.main27,
      border: palette.main27,
      icon: palette.main27,
    },
    pressed: {
      color: palette.main11,
      border: palette.main11,
      icon: palette.main11,
      bg: palette.base300,
    },
    active: {
      color: palette.main11,
      border: palette.main11,
      icon: palette.main11,
      bg: palette.base300,
    },
    disabled: {
      color: palette.main22,
      border: palette.main22,
      icon: palette.main22,
    },
  },
  failure: {
    base: {
      color: palette.main13,
      border: palette.main13,
      icon: palette.main13,
    },
    focus: {
      color: palette.main24,
      border: palette.main24,
      icon: palette.main24,
    },
    hover: {
      color: palette.main25,
      border: palette.main25,
      icon: palette.main25,
    },
    pressed: {
      color: palette.main13,
      border: palette.main13,
      icon: palette.main13,
      bg: palette.base400,
    },
    active: {
      color: palette.main13,
      border: palette.main13,
      icon: palette.main13,
      bg: palette.base400,
    },
    disabled: {
      color: palette.main22,
      border: palette.main22,
      icon: palette.main22,
    },
  },
})

export const FeedbackButton = styled(BaseIconButton)<{ status: TStatus }>((props) => {
  const { theme, size = 'xl', active, status } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getIconButtonSize(size)}
    ${getIconSize('m')}

    ${buttonBaseColors(statusColors(palette)[status].base)}

    ${buttonFocusColors(statusColors(palette)[status].focus)}

    ${buttonHoverColors(statusColors(palette)[status].hover)}

    ${buttonPressedColors(statusColors(palette)[status].pressed)}

    ${buttonDisabledColors(statusColors(palette)[status].disabled)}


    ${active && buttonActiveColors(statusColors(palette)[status].disabled)}
    border: 1px solid;

    ${propertyBreakpoints({
      props: size,
      values: (value) =>
        css`
          ${getButtonFont(value, theme)}
          ${getIconButtonSize(value)}
          ${getIconSize('m')}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
