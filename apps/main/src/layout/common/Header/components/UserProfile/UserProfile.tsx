import { ContextMenu } from '@peiko/components/ContextMenu'
import { ITriggerProps, Trigger } from './components/Trigger'
import { IProfilePopoverProps, ProfilePopover } from './components/ProfilePopover'

const arrowStyles = {
  width: '34px',
  height: '16px',
  zIndex: 100,
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  transform: 'rotate(0deg) translateY(-50%) translateX(-25%)',
}

interface IUserProfileProps {
  triggerProps?: ITriggerProps
  popoverProps?: IProfilePopoverProps
}

export const UserProfile = ({
  triggerProps,
  popoverProps,
}: IUserProfileProps): JSX.Element => (
  <ContextMenu
    on="hover"
    position="bottom center"
    renderMenu={() => <ProfilePopover {...popoverProps} />}
    trigger={<Trigger {...triggerProps} />}
    withArrow
    offsetY={18}
    arrowStyle={arrowStyles}
  />
)
