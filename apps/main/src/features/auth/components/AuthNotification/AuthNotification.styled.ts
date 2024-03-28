import styled from 'styled-components'
import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { TStatuses } from './AuthNotification'

const bgColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'main15',
  error: 'main16',
  info: 'base3',
}

const borderColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'main15',
  error: 'main16',
  info: 'main3',
}

export const StyledFilledChip = styled(FilledChip)<{
  status: TStatuses
}>`
  background-color: ${({ theme, status }) =>
    theme.palette[bgColors[status]] || theme.palette.base3};
  border-color: ${({ theme, status }) =>
    theme.palette[borderColors[status]] || theme.palette.base3};
  box-shadow: ${({ theme }) => theme.shadow.table};
  border-width: 1px;
  border-radius: 8px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.main3};
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export const Message = styled.p`
  color: ${({ theme }) => theme.palette.main19};
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`
