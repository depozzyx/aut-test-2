import styled, { css } from 'styled-components'
import { styleToCss } from '@peiko/styled/utils/style-to-css'
import { formatCssProperty } from '@peiko/styled/utils/format-css-property'
import { propertyBreakpoints } from '@peiko/styled/utils/property-breakpoints'
import { TCardProps } from './types'

const DEFAULT_BORDER_RADIUS = '8px'
const DEFAULT_PADDING = '24px'

export const CardContainer = styled.div<TCardProps>((props) => {
  const {
    theme,
    styles,
    bgColor,
    boxShadow,
    maxWidth,
    padding,
    margin,
    borderRadius,
    fullHeight,
    fullWidth,
    onClick,
  } = props

  return css`
    background: ${bgColor ? theme.palette[bgColor] : theme.palette.base3};
    box-shadow: ${boxShadow};
    max-width: ${formatCssProperty(maxWidth) || '100%'};
    border-radius: ${formatCssProperty(borderRadius) || DEFAULT_BORDER_RADIUS};
    padding: ${formatCssProperty(padding) || DEFAULT_PADDING};
    margin: ${formatCssProperty(margin) || 0};
    width: ${fullWidth ? '100%' : 'fit-content'};
    height: ${fullHeight ? '100%' : 'auto'};
    cursor: ${onClick ? 'pointer' : 'auto'};

    ${propertyBreakpoints({
      props,
      values: (value) => {
        const {
          bgColor,
          padding,
          margin,
          boxShadow,
          maxWidth,
          borderRadius,
          fullHeight,
          fullWidth,
        } = value

        return css`
          ${bgColor && `background-color: ${theme.palette[bgColor]};`}
          ${borderRadius && `border-radius: ${formatCssProperty(borderRadius)};`}
          ${maxWidth && `max-width: ${formatCssProperty(maxWidth)};`}
          ${padding && `padding: ${formatCssProperty(padding)};`}
          ${margin && `margin: ${formatCssProperty(margin)};`}
          ${boxShadow && `box-shadow: ${boxShadow};`}
          ${fullHeight && 'height: 100%;'}
          ${fullWidth && 'width: 100%;'}
        `
      },
    })}
    ${styles && styleToCss(styles, theme)};
  `
})
