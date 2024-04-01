import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const ItemWrapper = styled(Flex)<{ onClick?: () => void }>`
  ${({ theme, onClick }) => css`
    //&:last-child {
    //  margin-top: 16px;
    //}

    ${onClick &&
    css`
      &:hover {
        background-color: ${theme.palette.main22};
        color: ${theme.palette.main25};
      }
    `}
  `}
`

export const Divider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.main17};
  width: 1px;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.main17};
`
