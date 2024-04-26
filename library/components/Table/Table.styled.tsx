import styled from 'styled-components'

export const Table = styled.div<{ gridTemplateColumns: string; minHeight?: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-row-gap: 4px;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight ?? 'auto'};
`
