import styled, { css } from 'styled-components'

export const TDHead = styled.td(
  ({ theme }) => css`
    ${theme.fonts.f8}
  `,
)

export const TD = styled.td(
  ({ theme }) => css`
    padding-left: 24px;
    ${theme.fonts.f10}
  `,
)
