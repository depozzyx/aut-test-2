import { css, FlattenSimpleInterpolation } from 'styled-components'
import { TChipProps } from '../types'

export const getChipSize = (size: TChipProps['size']): FlattenSimpleInterpolation => {
  switch (size) {
    case 's':
      return css`
        height: 28px;
        border-radius: 14px;
      `
    case 'm':
      return css`
        height: 32px;
        border-radius: 16px;
      `
    case 'l':
      return css`
        height: 42px;
        border-radius: 21px;
      `
    default:
      return css``
  }
}
