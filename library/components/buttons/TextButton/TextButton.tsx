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
      color: palette.main2,
      icon: palette.main2,
    })}

    ${buttonFocusColors({
      bg: palette.main15,
    })}

    ${buttonHoverColors({
      bg: palette.base200,
    })}

    ${buttonPressedColors({
      bg: palette.main15,
    })}

    ${buttonDisabledColors({
      color: palette.main12,
      icon: palette.main12,
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
