import styled, { keyframes, css } from 'styled-components'
import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { TStatuses } from '@/features/common/notifications'

const bgColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'base300',
  error: 'base400',
  info: 'base4',
}

const borderColors: Record<TStatuses, keyof TDefaultPalette> = {
  success: 'main11',
  error: 'main13',
  info: 'main3',
}

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

export const StyledFilledChip = styled(FilledChip)<{
  status: TStatuses
  maxWidth: string
  withAnimation?: boolean
  slideOut?: boolean
}>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, status }) =>
    theme.palette[bgColors[status]] || theme.palette.base4};
  border-color: ${({ theme, status }) =>
    theme.palette[borderColors[status]] || theme.palette.main3};
  box-shadow: ${({ theme }) => theme.shadow.table};
  border-width: 1px;
  border-radius: 8px;

  svg path {
    fill: ${({ theme, status }) =>
      theme.palette[borderColors[status]] || theme.palette.main5};
  }

  ${({ withAnimation, slideOut }) =>
    withAnimation &&
    (slideOut
      ? css`
          animation: ${slideOutRight} 0.5s forwards ease-out;
        `
      : css`
          animation: ${slideInRight} 0.5s forwards ease-out;
        `)}
`
