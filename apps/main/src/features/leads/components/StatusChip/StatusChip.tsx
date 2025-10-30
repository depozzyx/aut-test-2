import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { DefaultTheme } from 'styled-components'
import { TLeadListStatus } from '@/types/leads/leads-list'
import { StyledChip } from './StatusChip.styled'

interface IStatusChipProps {
  status: TLeadListStatus
  cursor?: string
}

export const statusColor: Record<TLeadListStatus, keyof DefaultTheme['palette']> = {
  active: 'main7-100',
  inactive: 'main8-100',
}

export const LeadListStatusChip = ({ status, cursor }: IStatusChipProps): JSX.Element => {
  const { t } = useTranslation('leads-list')

  return (
    <StyledChip status={status}>
      <Text
        variant="f10"
        color={statusColor[status]}
        styles={{ textTransform: 'uppercase', cursor: cursor || 'default' }}
      >
        {t(`statuses.lead-list.${status}`)}
      </Text>
    </StyledChip>
  )
}
