import styled, { css } from 'styled-components'

export const Container = styled.nav<{ disabled?: boolean }>(
  ({ disabled }) => css`
    display: flex;
    flex-wrap: wrap;
    user-select: none;
    gap: 8px;
    ${disabled ? 'pointer-events: none;' : ''}
  `,
)
