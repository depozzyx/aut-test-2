import styled, { css } from 'styled-components'
import { propertyBreakpoints } from '@peiko/styled'
import { TAvatarGroupProps } from './types'

export const Group = styled('div')<{ spacing: TAvatarGroupProps['spacing'] }>(
  ({ spacing, theme }) => css`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    > div {
      box-sizing: content-box;
      border: 2px solid ${theme.palette.base};
      &:not(:last-of-type) {
        ${propertyBreakpoints<TAvatarGroupProps['spacing']>({
          props: spacing,
          values: (value) =>
            css`
              margin-left: ${value}px;
            `,
        })}
      }
    }
  `,
)
