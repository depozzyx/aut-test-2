import { Text } from '@peiko/components/Text'
import styled from 'styled-components'

export const ProgressBar = styled.div<{
  uploadProgress: number
  progress: number
  error?: boolean
}>`
  width: 100%;
  height: 5px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.base4};
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  overflow: hidden;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ progress }) => progress ?? 0}%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.main2};
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ uploadProgress, error }) => (error ? 100 : uploadProgress ?? 0)}%;
    height: 100%;
    background-color: ${({ theme, error }) =>
      error ? theme.palette.main13 : theme.palette.main11};
    border-radius: 6px;
    transition: width 0.3s ease;
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
