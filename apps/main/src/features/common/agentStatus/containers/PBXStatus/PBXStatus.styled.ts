import { Color, TPalette } from '@peiko/styles/types/palette'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import styled, { css, keyframes } from 'styled-components'

const blink = (color: Color) => keyframes`
  0% {
    opacity: 1;
    box-shadow: 0 0 10px ${hexToRGBA(color, 0.5)};
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 5px ${hexToRGBA(color, 0.25)};
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 10px ${hexToRGBA(color, 0.5)};
  }
`

export const BlinkingButton = styled.div<{ bgColor: keyof TPalette }>(
  ({ bgColor, theme }) => css`
    background-color: ${theme.palette[bgColor]};
    border: none;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    animation: ${blink(theme.palette[bgColor])} 1s infinite;
  `,
)
