import styled, { css } from 'styled-components'

import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { statusColor } from './AgentStatusChip'
import { TAgentWorkStatus } from '../../types'

const bgColor: Record<TAgentWorkStatus, keyof TDefaultPalette> = {
  start: 'main8',
  pause: 'main6',
  unpause: 'main7',
  finish: 'main10',
  'on-call': 'main9',
}

export const StyledChip = styled(FilledChip)<{ status: TAgentWorkStatus }>((props) => {
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
