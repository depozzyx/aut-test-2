import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { DefaultTheme } from 'styled-components'
import { StyledChip } from './StatusChip.styled'
import { TCampaignStatus } from '../../types'

interface IStatusChipProps {
  status: TCampaignStatus
}

export const statusColor: Record<TCampaignStatus, keyof DefaultTheme['palette']> = {
  new: 'main3',
  active: 'main',
  pause: 'main10-100',
  complete: 'main7-100',
  hold: 'main22',
}

export const StatusChip = ({ status }: IStatusChipProps): JSX.Element => {
  const { t } = useTranslation('campaigns')

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
