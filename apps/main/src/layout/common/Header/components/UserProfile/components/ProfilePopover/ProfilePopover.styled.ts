import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'

export const ItemWrapper = styled(Flex)<{ onClick?: () => void }>`
  ${({ theme, onClick }) => css`
    ${onClick &&
    css`
      &:hover {
        > p {
          color: ${theme.palette.main};
        }

        svg path {
          fill: ${theme.palette.main};
          stroke: ${theme.palette.main};
        }
      }
    `}
  `}
`

export const Divider = styled.hr`
  border-top: 0.5px solid ${({ theme }) => theme.palette.main21};
  width: 100%;
  margin: 0;
`
