import styled from 'styled-components'
import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { TStatuses } from '@/features/common/notifications'

const bgColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'base300',
  error: 'base400',
  info: 'base3',
}

const borderColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'main11',
  error: 'main13',
  info: 'main3',
}

export const StyledFilledChip = styled(FilledChip)<{
  status: TStatuses
  maxWidth: string
}>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, status }) =>
    theme.palette[bgColors[status]] || theme.palette.base3};
  border-color: ${({ theme, status }) =>
    theme.palette[borderColors[status]] || theme.palette.base3};
  box-shadow: ${({ theme }) => theme.shadow.table};
  border-width: 1px;
  border-radius: 8px;
`
