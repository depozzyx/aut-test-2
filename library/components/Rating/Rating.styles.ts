import { Rating as ReactRating } from 'react-simple-star-rating'
import styled, { css } from 'styled-components'
import { propertyBreakpoints, styleToCss } from '@peiko/styled'
import { TRatingProps } from './types'

export const Container = styled(ReactRating)<{
  size?: TRatingProps['size']
  styles: TRatingProps['styles']
  color?: TRatingProps['color']
  disabled?: TRatingProps['disabled']
}>((props) => {
  const { size, styles, color, disabled, theme } = props

  return css`
    line-height: 0;

    svg {
      width: ${size}px;
      height: ${size}px;
    }

    svg path {
      fill: ${color ? theme.palette[color] : theme.palette.base100};
    }

    ${disabled &&
    css`
      svg path {
        fill: ${theme.palette.main12};
      }
    `}

    ${propertyBreakpoints<TRatingProps['size']>({
      props: size,
      values: (value) =>
        css`
          svg {
            width: ${value}px;
            height: ${value}px;
          }
        `,
    })}
  
      ${styles && styleToCss(styles, theme)}
  `
})
