import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { CSSProperties } from 'react'

type TTooltip = {
  maxWidth?: CSSProperties['maxWidth']
}

export const Tooltip = styled(Popup)<TTooltip>`
  &-arrow {
    stroke-width: 2px;
    stroke: ${(props) => props.theme.palette.main8};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
    color: ${(props) => props.theme.palette.base3};
  }

  &-content {
    background-color: ${(props) => props.theme.palette.base3};
    border: 1px solid ${(props) => props.theme.palette.main8};
    border-radius: 8px;
    padding: 16px 24px;
    max-width: ${(props) => props.maxWidth || 'auto'};
  }
`

export const Menu = styled.div``
