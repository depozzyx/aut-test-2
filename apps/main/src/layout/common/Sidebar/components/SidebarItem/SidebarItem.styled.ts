import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const ItemWrapper = styled(Flex)<{ isSelected?: boolean }>((props) => {
  const { isSelected, theme } = props
  return css`
    background-color: ${isSelected ? theme.palette.main2 : 'transparent'};
    width: 100%;

    &:hover {
      background-color: ${theme.palette.main3};
    }

    &:focus {
      background-color: ${theme.palette.main14};
    }

    &:active {
      background-color: ${theme.palette.main14};
    }
  `
})
