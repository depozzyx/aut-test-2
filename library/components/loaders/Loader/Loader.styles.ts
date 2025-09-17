import styled, { css, keyframes } from 'styled-components'
import { styleToCss } from '@peiko/styles'
import { TLoaderProps } from './types'

const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
  } 
`

const getLabelPlacement = (labelPlacement: TLoaderProps['labelPlacement']) => {
  switch (labelPlacement) {
    case 'top':
      return 'column-reverse'
    case 'bottom':
      return 'column'
    case 'left':
      return 'row-reverse'
    case 'right':
      return 'row'
    default:
      return 'row'
  }
}

export const Wrapper = styled.div<{
  styles?: TLoaderProps['styles']
  labelPlacement: TLoaderProps['labelPlacement']
}>((props) => {
  const { styles, theme, labelPlacement } = props
  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: ${getLabelPlacement(labelPlacement)};
    gap: 8px;
    width: 100%;
    height: 100vh;

    ${styles && styleToCss(styles, theme)}
  `
})

export const Container = styled.span<{
  position?: TLoaderProps['position']
  top?: TLoaderProps['top']
  left?: TLoaderProps['left']
}>`
  line-height: 0;
  animation: ${rotate} 2s linear infinite;
  top: ${({ top }) => top || 0};
  left: ${({ left }) => left || 0};
  position: ${({ position }) => position || 'relative'};
  z-index: ${({ position, theme }) => (position === 'fixed' ? theme.zIndex.medium : 1)};
`

export const RotateContainer = styled.span<{
  position?: TLoaderProps['position']
  top?: TLoaderProps['top']
  left?: TLoaderProps['left']
  isRotating: boolean
}>`
  line-height: 0;
  display: inline-block;
  animation: ${({ isRotating }) => (isRotating ? rotate : 'none')} 1s linear infinite;
  top: ${({ top }) => top || 0};
  left: ${({ left }) => left || 0};
  position: ${({ position }) => position || 'relative'};
  z-index: ${({ position, theme }) => (position === 'fixed' ? theme.zIndex.medium : 1)};
`
