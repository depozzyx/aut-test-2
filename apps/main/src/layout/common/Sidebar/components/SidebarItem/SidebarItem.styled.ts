import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const ItemWrapper = styled(Flex)<{ isActive?: boolean }>((props) => {
  const { isActive, theme } = props
  return css`
    background-color: ${isActive ? theme.palette.main2 : 'transparent'};
    width: 100%;  
      
    &:hover {
      background-color: ${theme.palette.main2};
  `
})
