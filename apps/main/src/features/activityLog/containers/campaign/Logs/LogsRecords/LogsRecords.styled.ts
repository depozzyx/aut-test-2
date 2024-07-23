import styled, { css } from 'styled-components'
import { Text } from '@peiko/components/Text'

export const DetailsText = styled(Text)(
  ({ theme }) => css`
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${theme.palette.main};
  `,
)
