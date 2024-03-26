import PopupComponent from 'reactjs-popup'
import styled, { css, keyframes } from 'styled-components'
import { CSSProperties } from 'react'
import { formatCssProperty } from '@peiko/styles'
import { WINDOW_HEIGHT } from '@peiko/constants/css'
import { IconButton } from '@peiko/components/buttons/IconButton'

const open = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const translate = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
   transform: translateY(0);
  }
`

export const Popup = styled(PopupComponent)`
  &-overlay {
    overflow-y: auto;
    height: var(${WINDOW_HEIGHT});
    overscroll-behavior: none;
    top: 0 !important;
    background: ${({ theme }) => theme.palette.overlay};
    animation: ${open} 0.1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }

  &-content {
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: center;
  }
`

export const Container = styled.div<{ maxWidth: CSSProperties['maxWidth'] }>(
  (props) =>
    css`
      position: relative;
      margin: 0 auto;
      max-width: ${props.maxWidth ? formatCssProperty(props.maxWidth) : '100%'};
      animation: ${translate} 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
      outline: none;
    `,
)

export const Close = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`
