import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { DefaultTheme } from 'styled-components'
import { StyledChip } from './AgentStatusChip.styled'
import { TAgentActiveWorkStatus } from '../../types'

interface IStatusChipProps {
  status: TAgentActiveWorkStatus
}

export const statusColor: Record<TAgentActiveWorkStatus, keyof DefaultTheme['palette']> =
  {
    online: 'main7-100',
    'on-hold': 'main22',
    feedback: 'main6-100',
    'on-call': 'main10-100',
    pause: 'main',
    'manual pause': 'main22',
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
        {t(`work-statuses.${status}`)}
      </Text>
    </StyledChip>
  )
}
