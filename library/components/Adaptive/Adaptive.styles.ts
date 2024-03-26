import styled, { css } from 'styled-components'
import { propertyBreakpoints } from '@peiko/styles'
import { TAdaptive } from './types'

export const Container = styled('div')<TAdaptive>(
  ({ visible }) => css`
    ${propertyBreakpoints({
      props: visible,
      values: (value) => css`
        display: ${value};
      `,
    })}
  `,
)
