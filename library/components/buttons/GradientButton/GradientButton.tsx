import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseButton } from '../BaseButton'
import {
  buttonPressedColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonActiveColors,
} from '../utils/button-colors-styles'
import { getButtonFont } from '../utils/get-button-font'
import { getButtonSize } from '../utils/get-button-size'
import { getIconSize } from '../utils/get-icon-size'
import { TButtonProps } from '../types'

export const GradientButton = styled(BaseButton)((props) => {
  const { theme, size = 'm', active } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getButtonSize(size)}
    ${getIconSize(size)}
          
    ${buttonBaseColors({
      color: palette.base,
      bg: palette.main2,
      icon: palette.base,
      gradient: palette.main,
    })}

    ${buttonPressedColors({
      bg: palette.main2,
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
