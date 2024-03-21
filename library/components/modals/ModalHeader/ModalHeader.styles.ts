import styled, { css } from 'styled-components'
import { propertyBreakpoints, styleToCss } from '@peiko/styled'
import { THeaderProps } from './types'

export const Wrapper = styled.div<Pick<THeaderProps, 'alignItems' | 'gap' | 'styles'>>(
  (props) => {
    const { alignItems, gap, styles, theme } = props

    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: ${alignItems || 'center'};
      gap: 16px;

      ${propertyBreakpoints({
        props: gap,
        values: (value) => css`
          gap: ${value};
        `,
      })}

      ${styles && styleToCss(styles, theme)}
    `
  },
)
