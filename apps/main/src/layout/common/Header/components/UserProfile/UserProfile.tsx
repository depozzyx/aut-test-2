import { ContextMenu } from '@peiko/components/ContextMenu'
import { useAuth } from '@/features/common/user/hooks/use-auth'
import useToggleStyle from '../../../hooks/use-toggle-style'
import { Trigger } from './components/Trigger'
import { ProfilePopover } from './components/ProfilePopover'

const arrowStyles = {
  width: '34px',
  height: '16px',
  transform: 'rotate(0deg) translateY(-50%) translateX(-25%)',
}

const contentStyles = {
  zIndex: 0,
  filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))',
}

const shortenName = (fullName: string) => {
  const [firstName, lastName] = fullName.split(' ')
  return `${firstName} ${lastName ? `${lastName.charAt(0)}.` : ''}`
}

export const UserProfile = (): JSX.Element => {
  const { user } = useAuth()

  const { applyStyle, resetStyle } = useToggleStyle({
    selector: '#customPopupOverlay',
    styleProperty: 'display',
    newValue: 'block',
  })

  const shortName = shortenName(user?.name || '')

  return (
    <ContextMenu
      on="hover"
      position="bottom center"
      renderMenu={() => (
        <ProfilePopover
          userRole={user?.role}
          email={user?.email}
          name={user?.name ?? ''}
        />
      )}
      trigger={<Trigger userRole={user?.role} name={shortName} />}
      offsetY={18}
      arrowStyle={arrowStyles}
      contentStyle={contentStyles}
      withArrow
      customCloseHandler={resetStyle}
      customOpenHandler={applyStyle}
    />
  )
}
