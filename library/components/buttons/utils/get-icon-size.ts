import { FlattenSimpleInterpolation, css } from 'styled-components'
import { getSize } from '@peiko/components/icons'
import { TButtonProps } from '../types'

export const getIconSize = (size: TButtonProps['size']): FlattenSimpleInterpolation => {
  let iSize = ''

  if (size === 'l' || size === 'm') {
    iSize = getSize('m')
  } else if (size === 's') {
    iSize = getSize('s')
  } else if (size === 'ml') {
    iSize = getSize('ml')
  } else if (size === 'xl') {
    iSize = getSize('xl')
  }

  return css`
    svg {
      width: ${iSize};
      height: ${iSize};
    }
  `
}
