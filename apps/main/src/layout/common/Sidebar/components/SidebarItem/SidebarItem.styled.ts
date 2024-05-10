import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const ItemWrapper = styled(Flex)<{ isSelected?: boolean }>((props) => {
  const { isSelected, theme } = props
  return css`
    background-color: ${isSelected ? theme.palette.base4 : theme.palette.base};
    width: 100%;

    &:hover {
      background-color: ${theme.palette.base4};
    }

    &:focus {
      background-color: ${theme.palette.base4};
    }

    &:active {
      background-color: ${theme.palette.base4};
    }
  `
})
