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

export const FilledCheckboxIcon = styled(BaseCheckboxIcon)((props) => {
  const { theme, size = 'm', disabled } = props
  const { palette } = theme
  const { styles } = props

  return css`
    > div {
      ${getCheckboxIconSize(size)}
    }

    ${checkboxIconColors({
      bg: palette.base200,
      icon: palette.main2,
    })}

    ${checkboxIconHoverColors({
      bg: palette.base100,
    })}

    ${checkboxIconPressedColors({
      icon: palette.main2,
    })}

    ${disabled &&
    checkboxIconDisabledColors({
      bg: palette.base4,
      icon: palette.main12,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
