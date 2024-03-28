import { FlattenSimpleInterpolation, css } from 'styled-components'
import { TIconButtonProps } from '../types'

export const getIconButtonSize = (
  size: TIconButtonProps['size'],
): FlattenSimpleInterpolation => {
  switch (size) {
    case 'xs':
      return css`
        width: 24px;
        height: 24px;
        border-radius: 50%;
      `
    case 's':
      return css`
        width: 32px;
        height: 32px;
        border-radius: 50%;
      `
    case 'm':
      return css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
      `
    case 'l':
      return css`
        width: 60px;
        height: 60px;
        border-radius: 50%;
      `
    default:
      return css``
  }
}
