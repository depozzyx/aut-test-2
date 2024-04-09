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
      bg: palette.main14,
      icon: palette.base,
      color: palette.base,
    })}

    ${onClick &&
    chipFocusColors({
      bg: palette.main2,
      icon: palette.main4,
      color: palette.main4,
    })}

    ${onClick &&
    chipHoverColors({
      icon: palette.main4,
      color: palette.main4,
    })}
    
    ${onClick &&
    chipPressedColors({
      bg: palette.main2,
      icon: palette.main4,
    })}
    
    ${disabled &&
    chipDisabledColors({
      bg: palette.main21,
      icon: palette.main22,
      color: palette.main22,
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
