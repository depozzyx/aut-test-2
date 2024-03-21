import { FC, useCallback, useRef } from 'react'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { Container } from './Edit.styled'
import { TInputSizes } from '../../types'

type EditProps = {
  disabled?: boolean
  onClick?: () => void
} & TInputSizes

export const Edit: FC<EditProps> = ({ disabled = false, onClick, size = 'm' }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const iconSize = size === 'm' ? 's' : 's'

  const setBlure = useCallback(() => {
    if (!buttonRef.current) return
    buttonRef.current.blur()
  }, [])

  return (
    <Container
      disabled={disabled}
      onClick={onClick}
      onMouseLeave={setBlure}
      role="button"
      tabIndex={disabled ? -1 : 0}
      ref={buttonRef}
    >
      <EditIcon size={iconSize} />
    </Container>
  )
}
