import { Text } from '@peiko/components/Text'
import styled, { css } from 'styled-components'

export const BottomText = styled(Text)(
  ({ theme }) => css`
    background-color: ${theme.palette.base4};
    border: 1px solid ${theme.palette.main3};
    border-radius: 8px;
    padding: 0 16px;
    height: 48px;
    display: flex;
    align-items: center;
    flex: 1;
  `,
)
