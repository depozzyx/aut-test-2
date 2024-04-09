import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseIconButton } from '../BaseIconButton'
import {
  buttonBaseColors,
  buttonDisabledColors,
  buttonPressedColors,
  buttonActiveColors,
  buttonHoverColors,
  buttonFocusColors,
} from '../utils/button-colors-styles'
import { getIconButtonSize } from '../utils/get-icon-button-size'
import { getIconSize } from '../utils/get-icon-size'
import { getButtonFont } from '../utils/get-button-font'

export const FilledIconButton = styled(BaseIconButton)((props) => {
  const { theme, size = 'm', iconColor, active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getIconButtonSize(size)}
    ${getIconSize(size)}

    ${buttonBaseColors({
      color: palette.base,
      bg: palette.main,
      icon: iconColor ? palette[iconColor] : palette.base,
    })}

    ${buttonFocusColors({
      bg: palette.main15,
    })}

    ${buttonHoverColors({
      bg: palette.main16,
    })}

    ${buttonPressedColors({
      outline: palette.main18,
      bg: palette.main15,
    })}

    ${buttonDisabledColors({
      color: palette.main22,
      bg: palette.main21,
      icon: palette.main22,
    })}


    ${active &&
    buttonActiveColors({
      color: palette.base,
      bg: palette.main15,
      icon: palette.base,
    })}

    ${propertyBreakpoints({
      props: size,
      values: (value) =>
        css`
          ${getButtonFont(value, theme)}
          ${getIconButtonSize(value)}
          ${getIconSize(value)}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
