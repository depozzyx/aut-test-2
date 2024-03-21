import React from 'react'
import { StyledText } from './Text.styles'
import { TText } from './types'

export const Text = React.forwardRef<HTMLElement, TText>((props, ref) => {
  const { tag = 'p', children, ...otherProps } = props

  return (
    <>
      {children && (
        <StyledText as={tag} ref={ref} {...otherProps}>
          {children}
        </StyledText>
      )}
    </>
  )
})

Text.displayName = 'Text'
