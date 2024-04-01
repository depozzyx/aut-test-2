import styled, { css } from 'styled-components'

import { styleToCss, propertyBreakpoints } from '@peiko/styles'
import { TText } from './types'

export const StyledText = styled.p<TText>((props) => {
  const { theme, styles, variant } = props
  const { palette, fonts } = theme

  return css`
    position: relative;
    color: ${props.color ? palette[props.color] : palette.main5};
    transition: color 0.2s linear;

    ${variant && typeof variant === 'string' && fonts[variant]}

    ${propertyBreakpoints({
      props: variant,
      values: (value) =>
        css`
          ${fonts[value]}
        `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
