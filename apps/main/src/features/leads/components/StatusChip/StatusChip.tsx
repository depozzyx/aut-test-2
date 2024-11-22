import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { DefaultTheme } from 'styled-components'
import { TLeadListStatus } from '@/types/leads/leads-list'
import { StyledChip } from './StatusChip.styled'

interface IStatusChipProps {
  status: TLeadListStatus
}

export const statusColor: Record<TLeadListStatus, keyof DefaultTheme['palette']> = {
  active: 'main7-100',
  inactive: 'main8-100',
  successful: 'main7-100',
  unsuccessful: 'main8-100',
}

export const StatusChip = ({ status }: IStatusChipProps): JSX.Element => {
  const { t } = useTranslation('leads-list')

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
