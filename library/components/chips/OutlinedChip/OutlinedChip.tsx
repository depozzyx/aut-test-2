import styled, { css } from 'styled-components'
import { propertyBreakpoints, styleToCss } from '@peiko/styled'
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

export const OutlinedChip = styled(BaseChip)((props) => {
  const { theme, size = 'm', onClick, disabled, styles } = props
  const { palette } = theme

  return css`
    ${chipBaseColors({
      color: palette.main2,
      icon: palette.main2,
      border: palette.main2,
    })}

    ${onClick &&
    chipFocusColors({
      bg: palette.base100,
    })}

    ${onClick &&
    chipHoverColors({
      bg: palette.base200,
    })}
    
    ${onClick &&
    chipPressedColors({
      bg: palette.base100,
    })}
    
    ${disabled &&
    chipDisabledColors({
      color: palette.main12,
      border: palette.main12,
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
