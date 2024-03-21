import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styled'
import { getIconSize } from '../utils/get-icon-size'
import { getButtonFont } from '../utils/get-button-font'
import { getButtonSize } from '../utils/get-button-size'
import { BaseButton } from '../BaseButton/BaseButton'
import {
  buttonActiveColors,
  buttonBaseColors,
  buttonDisabledColors,
  buttonFocusColors,
  buttonHoverColors,
  buttonLoadingColors,
  buttonPressedColors,
} from '../utils/button-colors-styles'

export const AdditionalButton = styled(BaseButton)((props) => {
  const { theme, size = 'm', active, isLoading } = props
  const { palette } = theme
  const { styles } = props

  return css`
    ${getButtonFont(size, theme)}
    ${getButtonSize(size)}
    ${getIconSize(size)}

    ${buttonBaseColors({
      color: palette.main2,
      bg: palette.base3,
      icon: palette.main2,
    })}

    ${buttonFocusColors({
      bg: palette.base200,
    })}

    ${buttonHoverColors({
      bg: palette.base100,
    })}

    ${buttonPressedColors({
      bg: palette.base200,
    })}

    ${active &&
    buttonActiveColors({
      bg: palette.base200,
    })}

    ${isLoading &&
    buttonLoadingColors({
      icon: palette.main2,
    })}
    
    ${buttonDisabledColors({
      color: palette.main12,
      bg: palette.base3,
    })}
    
    ${propertyBreakpoints({
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
