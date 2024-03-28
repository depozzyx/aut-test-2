import styled, { css } from 'styled-components'
import { propertyBreakpoints, styleToCss } from '@peiko/styles'
import { BaseChip } from '../BaseChip'
import { getChipSize } from '../utils/get-chip-size'
import {
  chipBaseColors,
  chipDisabledColors,
  chipFocusColors,
  chipHoverColors,
  chipPressedColors,
} from '../utils/chip-color-style'
import { TChipProps } from '../types'
import { getChipFont } from '../utils/get-chip-font'
import { getIconSize } from '../utils/get-icon-size'

export const FilledChip = styled(BaseChip)((props) => {
  const { theme, size = 'm', onClick, disabled, styles } = props
  const { palette } = theme

  return css`
    ${chipBaseColors({
      color: palette.main19,
      bg: palette.base3,
      icon: palette.main3,
      border: palette.base3,
    })}

    ${onClick &&
    chipFocusColors({
      bg: palette.base200,
      icon: palette.main2,
    })}

    ${onClick &&
    chipHoverColors({
      color: palette.main2,
      icon: palette.main2,
    })}
    
    ${onClick &&
    chipPressedColors({
      bg: palette.base200,
      icon: palette.main2,
    })}
    
    ${disabled &&
    chipDisabledColors({
      color: palette.main12,
      bg: palette.main17,
      icon: palette.main12,
    })}

    ${propertyBreakpoints<TChipProps['size']>({
      props: size,
      values: (value) =>
        css`
          ${getChipFont(value, theme)}
          ${getChipSize(value)}
          ${getIconSize(value)}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
