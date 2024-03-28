import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseIconButton } from '../BaseIconButton'
import {
  buttonBaseColors,
  buttonHoverColors,
  buttonFocusColors,
  buttonDisabledColors,
  buttonLoadingColors,
  buttonPressedColors,
  buttonActiveColors,
} from '../utils/button-colors-styles'
import { getIconButtonSize } from '../utils/get-icon-button-size'
import { getIconSize } from '../utils/get-icon-size'
import { getButtonFont } from '../utils/get-button-font'
import { TIconButtonProps } from '../types'

export const IconButton = styled(BaseIconButton)((props) => {
  const { theme, size = 'm', iconColor, isLoading, active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getIconButtonSize(size)}
    ${getIconSize(size)}

    ${buttonBaseColors({
      color: palette.main2,
      icon: iconColor ? palette[iconColor] : palette.main2,
    })}

    ${buttonFocusColors({
      bg: palette.main15,
    })}

    ${buttonHoverColors({
      bg: palette.main19,
    })}

    ${buttonPressedColors({
      bg: palette.main15,
    })}

    ${buttonDisabledColors({
      color: palette.main11,
      icon: palette.main11,
    })}

    ${isLoading &&
    buttonLoadingColors({
      color: palette.main2,
      icon: palette.main2,
    })}

    ${active &&
    buttonActiveColors({
      bg: palette.main15,
    })}


    ${propertyBreakpoints<TIconButtonProps['size']>({
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
