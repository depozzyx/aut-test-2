import { Text } from '@peiko/components/Text'
import styled from 'styled-components'

export const ProgressBar = styled.div<{ progress: number; error?: boolean }>`
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

export const DuplicateText = styled(Text)`
  display: flex;
  align-items: center;
  gap: 8px;
  ::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.main13};
  }
`
