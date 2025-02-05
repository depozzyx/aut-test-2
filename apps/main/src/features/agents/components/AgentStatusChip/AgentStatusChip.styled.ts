import styled, { css } from 'styled-components'

import { FilledChip } from '@peiko/components/chips/FilledChip'
import { TDefaultPalette } from '@peiko/styles/types/palette'
import { statusColor } from './AgentStatusChip'
import { TAgentActiveWorkStatus } from '../../types'

const bgColor: Record<TAgentActiveWorkStatus, keyof TDefaultPalette> = {
  online: 'base300',
  'on-hold': 'main20',
  feedback: 'base',
  'on-call': 'base600',
  pause: 'base500',
  'manual pause': 'main20',
}

export const StyledChip = styled(FilledChip)<{ status: TAgentActiveWorkStatus }>(
  (props) => {
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
  },
)
