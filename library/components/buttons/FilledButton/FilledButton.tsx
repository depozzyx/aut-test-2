import styled, { css } from 'styled-components'
import { styleToCss } from '@peiko/styles/utils/style-to-css'
import { propertyBreakpoints } from '@peiko/styles/utils/property-breakpoints'
import { BaseButton } from '../BaseButton'
import {
  buttonPressedColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonActiveColors,
  buttonHoverColors,
  buttonFocusColors,
} from '../utils/button-colors-styles'
import { getButtonFont } from '../utils/get-button-font'
import { getButtonSize } from '../utils/get-button-size'
import { getIconSize } from '../utils/get-icon-size'
import { TButtonProps } from '../types'

export const FilledButton = styled(BaseButton)((props) => {
  const { theme, size = 'm', active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getButtonSize(size)}
    ${getIconSize(size)}
          
    ${buttonBaseColors({
      color: palette.base,
      bg: palette.main,
      icon: palette.base,
    })}

    ${buttonFocusColors({
      outline: palette['btn-focus'],
    })}

    ${buttonHoverColors({
      bg: palette['btn-focus'],
    })}

    ${buttonPressedColors({
      outline: palette['btn-focus'],
    })}

    ${buttonDisabledColors({
      color: palette.main12,
      bg: palette['btn-disabled'],
      icon: palette.main12,
    })}

    ${active &&
    buttonActiveColors({
      color: palette.base,
      bg: palette.main3,
      icon: palette.base,
    })}

    ${propertyBreakpoints<TButtonProps['size']>({
      props: size,
      values: (value) =>
        css`
          ${getButtonFont(value, theme)}
          ${getButtonSize(value)}
          ${getIconSize(value)}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
