import styled, { DefaultTheme, css, keyframes } from 'styled-components'
import { formatCssProperty } from '@peiko/styled'
import { TSkeletonProps } from './types'

const pulse = keyframes`
  0% { 
    background-position: 0% 0%; 
  }
  100% { 
    background-position: -135% 0%;
  }
`

const Container = styled.div<TSkeletonProps>((props) => {
  const {
    width = '100%',
    height = '100%',
    borderRadius = '4px',
    color = 'base3',
    theme,
  } = props

  const { palette } = theme

  const mainColor = palette[color as keyof DefaultTheme['palette']]

  return css`
    display: inline-block;
    width: ${formatCssProperty(width, 'px')};
    height: ${formatCssProperty(height, 'px')};
    border-radius: ${formatCssProperty(borderRadius, 'px')};
    background: linear-gradient(
      -90deg,
      ${palette.base2} 0%,
      ${mainColor} 50%,
      ${palette.base2} 100%
    );
    background-size: 400% 400%;
    animation: ${pulse} 1.2s ease-in-out infinite;
  `
})

export const Skeleton: React.FC<TSkeletonProps> = (props) => <Container {...props} />
