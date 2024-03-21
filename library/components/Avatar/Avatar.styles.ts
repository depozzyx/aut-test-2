import styled, { DefaultTheme, css } from 'styled-components'
import { styleToCss, formatCssProperty, propertyBreakpoints } from '@peiko/styled'
import { TAvatarProps } from './types'

export const Container = styled.div<{
  size: TAvatarProps['size']
  bgColor?: keyof DefaultTheme['palette']
  borderRadius?: number | string
  styles?: TAvatarProps['styles']
  src?: TAvatarProps['src']
  onClick?: TAvatarProps['onClick']
}>((props) => {
  const { theme, size, bgColor, borderRadius, src, styles, onClick } = props

  const { palette } = theme

  return css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 1;
    font-size: 1.25rem;
    overflow: hidden;
    user-select: none;
    width: ${typeof size === 'number' ? size : 40}px;
    height: ${typeof size === 'number' ? size : 40}px;
    background-color: ${() => {
      if (src) {
        return palette.base2
      }

      return bgColor ? palette[bgColor] : palette.main2
    }};

    border-radius: ${borderRadius ? formatCssProperty(borderRadius) : '50%'};
    cursor: ${onClick ? 'pointer' : 'default'};
    border: 1px solid transparent;
    transition: border-color 0.2s ease-in-out;

    &:hover {
      cursor: ${onClick ? 'pointer' : 'default'};
    }

    &:focus {
      outline: none;
      border: 1px solid ${palette.main2};
    }

    ${propertyBreakpoints<TAvatarProps['size']>({
      props: size,
      values: (value) =>
        css`
          width: ${value}px;
          height: ${value}px;
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
