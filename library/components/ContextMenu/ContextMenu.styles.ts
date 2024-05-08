import styled from 'styled-components'
import Popup from 'reactjs-popup'

export const StyledPopup = styled(Popup)`
  &-arrow {
    stroke-width: 2px;
    stroke: ${(props) => props.theme.palette.base};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
    color: ${(props) => props.theme.palette.base};
  }
  /* &-content {
    z-index: 1000;
  } */
`

export const Container = styled.div<{ containerStyles?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  &:focus-visible {
    outline: none;
  }

  ${(props) => props.containerStyles}
`
