import styled, { DefaultTheme } from 'styled-components'
import Popup from 'reactjs-popup'
import { CSSProperties } from 'react'

type TTooltip = {
  maxWidth?: CSSProperties['maxWidth']
  padding?: CSSProperties['padding']
  contentBackgroundColor?: keyof DefaultTheme['palette']
  arrowColor?: keyof DefaultTheme['palette']
  contentBorderColor?: keyof DefaultTheme['palette']
}

export const Tooltip = styled(Popup)<TTooltip>`
  &-arrow {
    stroke-width: 2px;
    stroke: ${(props) => props.theme.palette[props.arrowColor || 'main8']};
    stroke-dasharray: 30px;
    stroke-dashoffset: -54px;
    color: ${(props) => props.theme.palette[props.arrowColor || 'base3']};
  }

  &-content {
    background-color: ${(props) =>
      props.theme.palette[props.contentBackgroundColor || 'base3']};
    border: 1px solid
      ${(props) => props.theme.palette[props.contentBorderColor || 'main8']};
    border-radius: 8px;
    padding: ${(props) => props.padding || '16px 24px'};
    max-width: ${(props) => props.maxWidth || 'auto'};
  }
`

export const Menu = styled.div``
