import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { DefaultTheme } from 'styled-components'
import { StyledChip } from './AgentStatusChip.styled'
import { TAgentWorkStatus } from '../../types'

interface IStatusChipProps {
  status: TAgentWorkStatus
}

export const statusColor: Record<TAgentWorkStatus, keyof DefaultTheme['palette']> = {
  start: 'main8-100',
  'on-call': 'main8-100',
  pause: 'main6-100',
  unpause: 'main7-100',
  finish: 'main10-100',
}

export const AgentStatusChip = ({ status }: IStatusChipProps): JSX.Element => {
  const { t } = useTranslation('agents')

  return (
    <StyledChip status={status}>
      <Text
        variant="f10"
        color={statusColor[status]}
        styles={{ textTransform: 'uppercase' }}
      >
        {t(`statuses.${status}`)}
      </Text>
    </StyledChip>
  )
}
