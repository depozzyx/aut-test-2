import styled from 'styled-components'

export const Wrapper = styled.div<{ $minWidth?: string }>`
  overflow-x: auto;
  width: 100%;
  table {
    border-collapse: collapse;
    width: 100%;
    min-width: ${({ $minWidth }) => $minWidth || '640px'};
  }
`

export const Table = styled.table<{ $borderColor: string }>`
  border: 1px solid ${({ $borderColor }) => $borderColor};
  font-size: 12px;
  line-height: 1.3;
  background: ${({ theme }) => theme.palette.base3};

  th,
  td {
    border: 1px solid ${({ $borderColor }) => $borderColor};
    padding: 4px 8px;
  }

  th {
    background: ${({ theme }) => theme.palette.main4};
    font-weight: 600;
    text-align: left;
  }

  tfoot td {
    font-weight: 600;
    background: ${({ theme }) => theme.palette.main4};
  }
`
