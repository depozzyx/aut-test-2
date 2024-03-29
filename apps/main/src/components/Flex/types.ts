import { DefaultTheme, CSSProperties } from 'styled-components'
import { TStylesProps } from '@peiko/styles'

export type TFlexComponentProps = {
  bgColor?: keyof DefaultTheme['palette']
  color?: keyof DefaultTheme['palette']
  direction?: CSSProperties['flexDirection']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  wrap?: CSSProperties['flexWrap']
  gap?: CSSProperties['gap'] | number
  maxWidth?: CSSProperties['maxWidth'] | number
  margin?: CSSProperties['margin'] | number
  padding?: CSSProperties['padding'] | number
  width?: CSSProperties['width'] | number
  height?: CSSProperties['height'] | number
  borderWidth?: CSSProperties['borderWidth'] | number
  borderColor?: keyof DefaultTheme['palette']
  borderRadius?: CSSProperties['borderRadius'] | number
  fullHeight?: boolean
  fullWidth?: boolean
  onClick?: () => void
} & TStylesProps
