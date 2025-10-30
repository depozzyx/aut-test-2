import styled, { css } from 'styled-components'
import { TDefaultPalette } from '@peiko/styles/types/palette'

export type TVariantSize = 'small' | 'medium' | 'large'

interface IWrapperProps {
  borderRadius?: string
  bgColor?: keyof TDefaultPalette
  padding?: string
  variant?: TVariantSize
}

const getSize = (variant: TVariantSize) => {
  if (variant === 'medium' || variant === 'large') {
    return { size: 48, padding: 10 }
  }
  return { size: 38, padding: 7 }
}

export const IconWrapper = styled('div')<IWrapperProps>((props) => {
  const { borderRadius, bgColor, variant = 'small', theme } = props

  const { size, padding } = getSize(variant)

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${borderRadius || '50%'};
    background-color: ${theme.palette[bgColor || 'main3']};
    width: ${size}px;
    height: ${size}px;
    padding: ${padding};
  `
})
