// import { useTheme } from 'styled-components'
import { ContextMenu } from '@peiko/components/ContextMenu'
// import useToggleStyle from '@/layout/common/hooks/use-toggle-style'
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
  // Todo: Implement the useToggleStyle hook
  // const theme = useTheme()

  // const { applyStyle, resetStyle } = useToggleStyle({
  //   selector: '#user-profile',
  //   styleProperty: 'backgroundColor',
  //   newValue: theme.palette.overlay as string,
  // })

  <ContextMenu
    on="hover"
    position="bottom center"
    renderMenu={() => <ProfilePopover {...popoverProps} />}
    trigger={<Trigger {...triggerProps} />}
    offsetY={18}
    arrowStyle={arrowStyles}
    withArrow
    // onOpen={() => console.log('open')}
    // onClose={() => console.log('close')}
  />
)
