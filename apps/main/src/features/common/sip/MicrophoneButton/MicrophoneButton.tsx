import { TDefaultPalette } from '@peiko/styles/types/palette'
import { MicrophoneIcon } from '@peiko/components/icons/MicrophoneIcon'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import { IconWrapper, TVariantSize } from './MicrophoneButton.styled'

interface IMicrophoneButtonProps {
  iconSize?: string
  color?: keyof TDefaultPalette
  variant?: TVariantSize
  borderRadius?: string
  bgColor?: keyof TDefaultPalette
  onClick?: () => void
  disabled?: boolean
}

export const MicrophoneButton = ({
  iconSize,
  color = 'base',
  onClick,
  disabled,
  ...rest
}: IMicrophoneButtonProps): JSX.Element | null => (
  <IconWrapper {...rest}>
    <BaseButton
      startIcon={<MicrophoneIcon color={color} width={iconSize} height={iconSize} />}
      size="l"
      width="48px"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    />
  </IconWrapper>
)
