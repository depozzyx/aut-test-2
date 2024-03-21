import React, { useCallback, useRef } from 'react'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { TChipProps } from '../types'
import { ChipLabel, Container } from './BaseChip.styles'

export const BaseChip: React.FC<TChipProps> = ({
  children,
  startAdornment,
  endAdornment,
  size = 'm',
  styles,
  onDelete,
  onClick,
  disabled,
  ...props
}) => {
  const chipRef = useRef<HTMLButtonElement | null>(null)

  const setBlure = useCallback(() => {
    if (!chipRef.current) return
    chipRef.current.blur()
  }, [])

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) onDelete()
  }

  if (!children) return null

  return (
    <Container
      ref={chipRef}
      size={size}
      styles={styles}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      as={onClick ? 'button' : undefined}
      onMouseLeave={onClick ? setBlure : undefined}
      role={onClick ? 'button' : undefined}
      disabled={disabled}
      {...props}
    >
      {startAdornment}
      <ChipLabel>{children}</ChipLabel>
      {endAdornment}
      {onDelete && (
        <IconButton
          size="s"
          styles={{
            width: '24px',
            height: '24px',
          }}
          onClick={handleDelete}
        >
          <CloseIcon size="s" />
        </IconButton>
      )}
    </Container>
  )
}
