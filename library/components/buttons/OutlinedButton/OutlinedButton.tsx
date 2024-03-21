import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styled'
import { BaseButton } from '../BaseButton/BaseButton'
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
      border: palette.main2,
      color: palette.main2,
      icon: palette.main2,
    })}

    ${buttonFocusColors({
      color: palette.main2,
      bg: palette.base100,
      icon: palette.base100,
    })}

    ${buttonHoverColors({
      color: palette.main2,
      bg: palette.base200,
      icon: palette.main2,
    })}

    ${buttonPressedColors({
      bg: palette.base100,
      outline: palette.base200,
    })}

    ${buttonDisabledColors({
      color: palette.main12,
      bg: 'transparent',
      border: palette.main12,
      icon: palette.main12,
    })}

    ${isLoading &&
    `${buttonLoadingColors({
      color: palette.main2,
      bg: palette.base100,
      icon: palette.main2,
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
