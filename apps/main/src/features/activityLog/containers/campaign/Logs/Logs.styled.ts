import styled, { css } from 'styled-components'
import { Card } from '@peiko/components/Card'

export const LogContentWrapper = styled(Card)<{ isLoading: boolean }>(
  ({ theme, isLoading }) => css`
    position: relative;
    margin-top: 10px;
    display: flex;
    width: 100%;
    background-color: ${theme.palette.overlay};
    padding: 12px;
    min-height: 500px;

    ${isLoading &&
    css`
      justify-content: center;
      align-items: center;
    `}
  `,
)

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`
