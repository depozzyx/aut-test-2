import { FlattenSimpleInterpolation, css } from 'styled-components'
import { TButtonProps } from '../types'

export const getButtonSize = (size: TButtonProps['size']): FlattenSimpleInterpolation => {
  switch (size) {
    case 's':
      return css`
        padding: 0 16px;
        height: 40px;
        gap: 8px;
        border-radius: 8px;
      `
    case 'm':
      return css`
        padding: 0 24px;
        height: 40px;
        gap: 12px;
        border-radius: 8px;
      `
    case 'l':
      return css`
        padding: 0 32px;
        height: 60px;
        gap: 16px;
        border-radius: 8px;
      `
    default:
      return css``
  }
}
