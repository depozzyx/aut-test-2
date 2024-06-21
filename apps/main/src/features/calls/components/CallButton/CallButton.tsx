import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { getButtonFont } from '@peiko/components/buttons/utils/get-button-font'
import { getIconButtonSize } from '@peiko/components/buttons/utils/get-icon-button-size'
import { getIconSize } from '@peiko/components/buttons/utils/get-icon-size'
import {
  buttonActiveColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonFocusColors,
  buttonHoverColors,
  buttonPressedColors,
} from '@peiko/components/buttons/utils/button-colors-styles'

export const CallButton = styled(BaseIconButton)((props) => {
  const { theme, size = 'xl', iconColor, active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getIconButtonSize(size)}
    ${getIconSize(size === 'xl' ? 'l' : size)}

    ${buttonBaseColors({
      color: palette.base,
      bg: palette.main13,
      icon: iconColor ? palette[iconColor] : palette.base,
    })}

    ${buttonFocusColors({
      bg: palette.main24,
    })}

    ${buttonHoverColors({
      bg: palette.main25,
    })}

    ${buttonPressedColors({
      outline: palette.main8,
      bg: palette.main13,
    })}

    ${buttonDisabledColors({
      color: palette.main22,
      bg: palette.main21,
      icon: palette.main22,
    })}


    ${active &&
    buttonActiveColors({
      color: palette.base,
      bg: palette.main13,
      icon: palette.base,
    })}

    ${propertyBreakpoints({
      props: size,
      values: (value) =>
        css`
          ${getButtonFont(value, theme)}
          ${getIconButtonSize(value)}
          ${getIconSize(size === 'xl' ? 'l' : size)}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
