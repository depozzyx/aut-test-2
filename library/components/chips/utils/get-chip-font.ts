import { DefaultTheme } from 'styled-components'
import { TChipProps } from '../types'

export const getChipFont = (size: TChipProps['size'], theme: DefaultTheme): string => {
  if (size === 'm') {
    return theme.fonts.f5
  }
  if (size === 's') {
    return theme.fonts.f7
  }
  return theme.fonts.f3
}
