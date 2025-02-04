import { IconButton } from '@peiko/components/buttons/IconButton'
import { PlayIcon } from '@peiko/components/icons/PlayIcon'
import { StopIcon } from '@peiko/components/icons/StopIcon'
import { TCampaignStatus } from '../../types'
import { CAMPAIGN_STATUSES } from '../../constants'

interface IActionBtnProps {
  status: TCampaignStatus
  disabled: boolean
  onClick: () => void
}

export const ActionBtn = ({
  status,
  disabled,
  onClick,
}: IActionBtnProps): JSX.Element => {
  let icon

  switch (status) {
    case 'active':
      icon = <StopIcon width="24px" height="24px" />
      break
    case 'pause':
      icon = <PlayIcon width="24px" height="24px" />
      break
    case 'complete':
      icon = <PlayIcon color="main22" width="24px" height="24px" />
      break
    default:
      icon = <PlayIcon width="24px" height="24px" />
  }

  const iconColor = status === CAMPAIGN_STATUSES.COMPLETE ? 'main22' : 'main3'

  return (
    <IconButton disabled={disabled} iconColor={iconColor} onClick={onClick}>
      {icon}
    </IconButton>
  )
}
