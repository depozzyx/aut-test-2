import styled, { CSSProperties, css } from 'styled-components'
import { formatCssProperty } from '@peiko/styled'
import { TLinearProgressProps } from './types'

export const Container = styled.div<{
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  borderRadius?: CSSProperties['borderRadius']
}>((props) => {
  const { width, height, borderRadius } = props

  return css`
    width: ${width ? formatCssProperty(width) : '100%'};
    height: ${height ? formatCssProperty(height) : '4px'};
    background-color: ${(props) => props.theme.palette.base3};
    border-radius: ${borderRadius ? formatCssProperty(borderRadius, 'px') : '4px'};
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  `
})

export const ProgressBar = styled.div<{ color: TLinearProgressProps['color'] }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: ${({ theme, color }) =>
    color ? theme.palette[color] : theme.palette.main2};
  transition: width 0.1s ease-in-out;
`
