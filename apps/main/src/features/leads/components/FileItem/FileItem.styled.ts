import styled from 'styled-components'

export const ProgressBar = styled.div<{ progress: number; error?: string }>`
  width: 100%;
  height: 5px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.base4};
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  :after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ progress, error }) => (error ? 100 : progress ?? 0)}%;
    height: 100%;
    background-color: ${({ theme, error }) =>
      error ? theme.palette.main13 : theme.palette.main2};
    border-radius: 6px;
  }
`
