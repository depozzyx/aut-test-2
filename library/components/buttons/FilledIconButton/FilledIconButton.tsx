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
  const { theme, size = 'm', active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getIconButtonSize(size)}
    ${getIconSize(size)}

    ${buttonBaseColors({
      color: palette.base,
      bg: palette.main2,
      icon: palette.base,
    })}

    ${buttonFocusColors({
      outline: palette.main15,
    })}

    ${buttonHoverColors({
      bg: palette.main3,
    })}

    ${buttonPressedColors({
      outline: palette.main15,
    })}

    ${buttonDisabledColors({
      color: palette.main12,
      bg: palette.main17,
      icon: palette.main12,
    })}


    ${active &&
    buttonActiveColors({
      color: palette.base,
      bg: palette.main3,
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
