import styled, { css } from 'styled-components'
import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { TLeadListStatus } from '@/types/leads/leads-list'
import { statusColor } from './StatusChip'

const bgColor: Record<TLeadListStatus, keyof TDefaultPalette> = {
  active: 'base300',
  inactive: 'base400',
  successful: 'base300',
  unsuccessful: 'base400',
}

export const StyledChip = styled(FilledChip)<{ status: TLeadListStatus }>((props) => {
  const { theme, status } = props
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: ${['unsuccessful', 'successful'].includes(status) ? '110px' : '100px'};
    width: 100%;
    height: 28px;
    background-color: ${theme.palette[bgColor[status]]};
    border-color: ${['active', 'successful'].includes(status)
      ? 'transparent'
      : theme.palette[statusColor[status]]};
  `
})
