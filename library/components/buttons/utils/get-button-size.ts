import { FlattenSimpleInterpolation, css } from 'styled-components'
import { TButtonProps } from '../types'

export const getButtonSize = (size: TButtonProps['size']): FlattenSimpleInterpolation => {
  switch (size) {
    case 's':
      return css`
        padding: 4px 8px;
        height: 32px;
        gap: 4px;
        border-radius: 8px;
        //max-width: 134px;
      `
    case 'm':
      return css`
        padding: 4px 8px;
        height: 36px;
        gap: 4px;
        border-radius: 8px;
        //max-width: 236px;
      `
    case 'l':
      return css`
        padding: 4px 8px;
        height: 42px;
        gap: 16px;
        border-radius: 8px;
        //max-width: 246px;
      `
    default:
      return css``
  }
}
