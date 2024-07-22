import React, { useCallback, forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { TChipProps } from '../types'
import { ChipLabel, Container } from './BaseChip.styles'

export const BaseChip = forwardRef<HTMLDivElement, TChipProps>(
  (
    {
      children,
      startAdornment,
      endAdornment,
      size = 'm',
      styles,
      onDelete,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const chipRef = useRef<HTMLDivElement | null>(null)

    const setBlur = useCallback(() => {
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
        ref={mergeRefs([chipRef, ref])}
        size={size}
        styles={styles}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
        as={onClick ? 'button' : 'div'}
        onMouseLeave={onClick ? setBlur : undefined}
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
  },
)

BaseChip.displayName = 'BaseChip'
