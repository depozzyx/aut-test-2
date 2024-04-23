import { FC, useCallback, useRef } from 'react'
import { EyeIcon } from '@peiko/components/icons/EyeIcon'
import { ClosedEyeIcon } from '@peiko/components/icons/ClosedEyeIcon'
import { Container } from './Eye.styled'
import { TInputSizes } from '../../types'

type Eye = {
  open?: boolean
  disabled?: boolean
  onClick?: () => void
} & TInputSizes

export const Eye: FC<Eye> = ({ open = false, disabled = false, onClick, size = 'l' }) => {
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
      onKeyPress={onClick}
      onMouseLeave={setBlure}
      role="button"
      tabIndex={disabled ? -1 : 0}
      ref={buttonRef}
    >
      {open ? <ClosedEyeIcon size={iconSize} /> : <EyeIcon size={iconSize} />}
    </Container>
  )
}
