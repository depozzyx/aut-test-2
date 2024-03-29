import styled, { css } from 'styled-components'
import { styleToCss, formatCssProperty } from '@peiko/styles'
import { TFlexComponentProps } from './types'

export const FlexContainer = styled.div<TFlexComponentProps>((props) => {
  const {
    direction = 'row',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    gap,
    maxWidth,
    margin,
    padding,
    width,
    height,
    borderWidth,
    borderColor,
    borderRadius,
    bgColor,
    color,
    fullHeight,
    fullWidth,
    styles,
    theme,
  } = props

  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    flex-wrap: ${wrap};
    ${gap && `gap: ${formatCssProperty(gap)};`}
    ${maxWidth && `max-width: ${formatCssProperty(maxWidth)};`}
    ${margin && `margin: ${formatCssProperty(margin)};`}
    ${padding && `padding: ${formatCssProperty(padding)};`}
    ${width && `width: ${formatCssProperty(width)};`}
    ${height && `height: ${formatCssProperty(height)};`}
    ${borderWidth && `border-width: ${formatCssProperty(borderWidth)};`}
    ${borderColor && `border-color: ${theme.palette[borderColor] || borderColor};`}
    ${borderRadius && `border-radius: ${formatCssProperty(borderRadius)};`}
    ${bgColor && `background-color: ${theme.palette[bgColor] || bgColor};`}
    ${color && `color: ${theme.palette[color] || color};`}
    ${fullHeight && 'height: 100%;'}
    ${fullWidth && 'width: 100%;'}

    ${styles && styleToCss(styles, theme)};
  `
})
