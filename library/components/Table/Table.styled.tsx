import styled from 'styled-components'

export const Table = styled.div<{ gridTemplateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-row-gap: 4px;
  width: 100%;
`
