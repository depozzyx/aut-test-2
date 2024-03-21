import { css, FlattenSimpleInterpolation } from 'styled-components'
import { getSize } from '@peiko/components/icons'
import { TChipProps } from '../types'

export const getIconSize = (size: TChipProps['size']): FlattenSimpleInterpolation => {
  let iSize = ''

  if (size === 'l' || size === 'm') {
    iSize = getSize('m')
  } else {
    iSize = getSize('s')
  }

  return css`
    svg {
      width: ${iSize};
      height: ${iSize};
    }
  `
}
