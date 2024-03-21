import React from 'react'
import { CardContainer } from './Card.styles'
import { TCardProps } from './types'

/**
 * This is general purpose Card component.
 */
export const Card = React.forwardRef<HTMLDivElement, TCardProps>(
  ({ children, ...props }, ref) => (
    <CardContainer {...props} ref={ref}>
      {children}
    </CardContainer>
  ),
)

Card.displayName = 'Card'
