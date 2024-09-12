import { FlattenSimpleInterpolation, css } from 'styled-components'
import { TIconButtonProps } from '../types'

export const getIconButtonSize = (
  size: TIconButtonProps['size'],
): FlattenSimpleInterpolation => {
  switch (size) {
    case 's':
      return css`
        width: 24px;
        height: 24px;
        border-radius: 4px;
      `
    case 'm':
      return css`
        width: 32px;
        height: 32px;
        border-radius: 4px;
      `
    case 'ml':
      return css`
        width: 36px;
        height: 36px;
        border-radius: 4px;
      `
    case 'l':
      return css`
        width: 40px;
        height: 40px;
        border-radius: 4px;
      `
    case 'xl':
      return css`
        width: 60px;
        height: 60px;
        border-radius: 4px;
      `
    default:
      return css``
  }
}
