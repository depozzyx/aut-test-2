import styled from 'styled-components'
import { formatCssProperty } from '@peiko/styled'
import { TInlineLoaderContainerProps } from './types'

export const Container = styled.div<TInlineLoaderContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? formatCssProperty(width, 'px') : '100%')};
  height: ${({ height }) => (height ? formatCssProperty(height, 'px') : '4px')};
  top: ${({ top }) => top || 0};
  left: ${({ left }) => left || 0};
  position: ${({ position }) => position || 'relative'};
  z-index: ${({ position, theme }) => (position === 'fixed' ? theme.zIndex.medium : 1)};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? formatCssProperty(borderRadius) : 0};
  overflow: hidden;

  & > span {
    background-color: ${({ theme, bgColor }) =>
      bgColor ? theme.palette[bgColor] : theme.palette.base200} !important;
    span {
      background-color: ${({ theme, color }) =>
        color ? theme.palette[color] : theme.palette.main2} !important;
    }
  }
`
