import styled from 'styled-components'
import Popup from 'reactjs-popup'

const BORDER_RADIUS = '8px'

export const StyledPopup = styled(Popup)`
  &-arrow {
    stroke-width: 2px;
    stroke: ${(props) => props.theme.palette.base};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
    color: ${(props) => props.theme.palette.base};
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.base};
  border-radius: ${BORDER_RADIUS};

  &:focus-visible {
    outline: none;
  }
`
