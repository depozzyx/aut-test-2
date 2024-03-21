import { FlattenSimpleInterpolation, css } from 'styled-components'
import { getSize } from '@peiko/components/icons/BaseIcon'
import { TSelectProps } from '../types'

export const getIconSize = (size: TSelectProps['size']): FlattenSimpleInterpolation => {
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
