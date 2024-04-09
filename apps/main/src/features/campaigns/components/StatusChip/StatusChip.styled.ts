import styled, { css } from 'styled-components'
import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { statusColor } from './StatusChip'
import { TCampaignStatus } from '../../types'

const bgColor: Record<TCampaignStatus, keyof TDefaultPalette> = {
  active: 'base500',
  pause: 'base600',
  complete: 'base300',
}

export const StyledChip = styled(FilledChip)<{ status: TCampaignStatus }>((props) => {
  const { theme, status } = props
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100px;
    width: 100%;
    height: 28px;
    background-color: ${theme.palette[bgColor[status]]};
    border-color: ${theme.palette[statusColor[status]]};
  `
})
