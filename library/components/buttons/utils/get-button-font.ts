import { DefaultTheme } from 'styled-components'
import { TButtonProps } from '../types'

export const getButtonFont = (
  size: TButtonProps['size'],
  theme: DefaultTheme,
): string => {
  if (size === 'm') {
    return theme.fonts.f5
  }
  if (size === 's') {
    return theme.fonts.f5
  }
  return theme.fonts.f3
}
