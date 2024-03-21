import { css, FlattenSimpleInterpolation } from 'styled-components'
import { TCheckboxIconProps } from '../BaseCheckboxIcon/types'

export const getCheckboxIconSize = (
  size: TCheckboxIconProps['size'],
): FlattenSimpleInterpolation => {
  switch (size) {
    case 's':
      return css`
        width: 32px;
        height: 32px;

        svg {
          width: 16px;
          height: 16px;
        }
      `
    case 'm':
      return css`
        width: 36px;
        height: 36px;

        svg {
          width: 20px;
          height: 20px;
        }
      `
    case 'l':
      return css`
        width: 40px;
        height: 40px;

        svg {
          width: 24px;
          height: 24px;
        }
      `
    default:
      return css``
  }
}
