import { FC } from 'react'
import { TFlexComponentProps } from './types'
import { FlexContainer } from './Flex.styled'

export const Flex: FC<TFlexComponentProps> = ({ children, onClick, ...rest }) => (
  <FlexContainer as={onClick ? 'button' : undefined} onClick={onClick} {...rest}>
    {children}
  </FlexContainer>
)
