import { forwardRef } from 'react'
import { TFlexComponentProps } from './types'
import { FlexContainer } from './Flex.styled'

export const Flex = forwardRef<HTMLDivElement, TFlexComponentProps>(
  ({ children, onClick, tag, ...rest }, ref) => (
    <FlexContainer ref={ref} as={tag} onClick={onClick} {...rest}>
      {children}
    </FlexContainer>
  ),
)

Flex.displayName = 'Flex'
