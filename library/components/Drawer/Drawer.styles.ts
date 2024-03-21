import styled, { css } from 'styled-components'
import { TDrawerPosition, TDrawerProps } from './types'

const styleDrawerByPosition = (position: TDrawerPosition) => {
  switch (position) {
    case 'left':
      return `
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
        `
    case 'right':
      return `
            right: 0;
            top: 0;
            bottom: 0;
            transform: translateX(100%);
        `
    case 'top':
      return `
            top: 0;
            left: 0;
            right: 0;
            transform: translateY(-100%);
        `
    case 'bottom':
      return `
            bottom: 0;
            left: 0;
            right: 0;
            transform: translateY(100%);
        `
    default:
      return ''
  }
}

const fullScreenStyles = css`
  width: 100%;
  height: 100%;
`

const TRANSITION_DURATION = '0.3s'
const TRANSITION_TIMING_FUNCTION = 'ease'

const drawerAnimation = css`
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  transition-property: transform;
`

export const DrawerContainer = styled.div<{
  open: boolean
  position: TDrawerPosition
  fullScreen: boolean
  disableAnimation: boolean
}>((props) => {
  const { open, fullScreen, position, disableAnimation } = props

  return css`
    opacity: 0;
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.high + 1};
    overflow-y: auto;
    ${!disableAnimation && drawerAnimation}

    ${styleDrawerByPosition(position)}
    ${fullScreen && fullScreenStyles}

    ${open &&
    css`
      opacity: 1;
      transform: translateX(0);
      transform: translateY(0);
    `}
  `
})

export const Backdrop = styled.div<{ open: TDrawerProps['open'] }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.overlay};
  z-index: ${({ theme }) => theme.zIndex.high};
  transition: opacity 0.3s ease;
  display: none;
  opacity: 0;

  /* When the drawer is open, show the backdrop */
  ${(props) =>
    props.open &&
    css`
      display: block;
      opacity: 1;
    `}
`
