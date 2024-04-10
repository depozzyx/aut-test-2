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
  buttonLoadingColors,
} from '../utils/button-colors-styles'
import { TIconButtonProps } from '../types'

export const OutlinedButton = styled(BaseButton)((props) => {
  const { theme, size = 'm', isLoading } = props
  const { palette } = theme
  const { styles } = props

  return css`
    border: 2px solid ${palette.main2};
    ${getButtonSize(size)}
    ${getIconSize(size)}
    ${getButtonFont(size, theme)}

    ${buttonBaseColors({
      border: palette.main,
      color: palette.main,
      icon: palette.main,
    })}

    ${buttonFocusColors({
      color: palette.main,
      bg: palette.main18,
      icon: palette.main,
      border: palette.main,
    })}

    ${buttonHoverColors({
      color: palette.main16,
      bg: palette.main19,
      icon: palette.main16,
      border: palette.main16,
    })}

    ${buttonPressedColors({
      color: palette.main16,
      bg: palette.main17,
      outline: palette.main18,
    })}

    ${buttonDisabledColors({
      color: palette.main12,
      bg: palette.transparent,
      border: palette.main12,
      icon: palette.main12,
    })}

    ${isLoading &&
    `${buttonLoadingColors({
      color: palette.main,
      bg: palette.main18,
      icon: palette.main,
    })}`}

    ${propertyBreakpoints<TIconButtonProps['size']>({
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
