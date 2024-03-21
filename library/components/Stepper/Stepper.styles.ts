import styled from 'styled-components'
import { Text } from '@peiko/components/Text'

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const Step = styled.div<{ isActive: boolean }>`
  border-radius: 50%;
  color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.main2 : theme.palette.base4};
`

export const StepLine = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: ${({ theme }) => theme.palette.main2};
`

export const StepLabel = styled(Text)<{ isActive: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.main9 : theme.palette.main11};
`

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
