import styled, { css } from 'styled-components'
import { styleToCss } from '@peiko/styled'
import { BaseCheckboxIcon } from '../BaseCheckboxIcon'
import { getCheckboxIconSize } from '../utils/get-checkbox-icon-size'
import {
  checkboxIconColors,
  checkboxIconDisabledColors,
  checkboxIconHoverColors,
  checkboxIconPressedColors,
} from '../utils/get-checkbox-icon-colors-styles'

export const CheckboxIcon = styled(BaseCheckboxIcon)((props) => {
  const { theme, size = 'm', disabled } = props
  const { palette } = theme
  const { styles } = props

  return css`
    > div {
      ${getCheckboxIconSize(size)}
    }

    ${checkboxIconColors({
      icon: palette.main2,
    })}

    ${checkboxIconHoverColors({
      bg: palette.base200,
      icon: palette.main2,
    })}

    ${checkboxIconPressedColors({
      bg: palette.base200,
      icon: palette.main2,
    })}

    ${disabled &&
    checkboxIconDisabledColors({
      icon: palette.main12,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
