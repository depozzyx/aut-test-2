import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { BaseButton } from '../BaseButton'
import { getIconSize } from '../utils/get-icon-size'
import { getButtonFont } from '../utils/get-button-font'
import { getButtonSize } from '../utils/get-button-size'
import {
  buttonPressedColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonFocusColors,
  buttonHoverColors,
} from '../utils/button-colors-styles'
import { TButtonProps } from '../types'

export const TextButton = styled(BaseButton)((props) => {
  const { theme, size = 'm' } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getButtonSize(size)}
    ${getIconSize(size)}

    ${buttonBaseColors({
      color: palette.main,
      icon: palette.main,
    })}

    ${buttonFocusColors({
      bg: palette.main22,
      color: palette.main,
      icon: palette.main,
    })}

    ${buttonHoverColors({
      bg: palette.main19,
      color: palette.main16,
      icon: palette.main16,
    })}

    ${buttonPressedColors({
      bg: palette.main17,
      color: palette.main16,
      icon: palette.main16,
    })}

    ${buttonDisabledColors({
      color: palette.main18,
      icon: palette.main18,
    })}

    ${propertyBreakpoints<TButtonProps['size']>({
      props: size,
      values: (value) =>
        css`
          ${getButtonFont(value, theme)}
          ${getIconSize(value)}
        }
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
