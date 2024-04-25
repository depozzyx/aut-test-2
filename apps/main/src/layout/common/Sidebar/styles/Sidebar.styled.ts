import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'
import { OutlinedAccordion } from '@peiko/components/accordions/OutlinedAccordion'

export const Container = styled(Flex)(
  ({ theme }) => css`
    min-height: calc(100vh - var(--header-height));
    flex-direction: column;
    justify-content: space-between;
    background-color: ${theme.palette.main4};
    flex: 0 0 100px;
  `,
)

export const MenuItem = styled(Flex)<{ isOpen?: boolean }>`
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.palette.main2 : theme.palette.main4};
  cursor: pointer;
  transition: 0.25s;
`

export const Accordion = styled(OutlinedAccordion)`
  > button {
    :focus,
    :active {
      ${MenuItem} {
        background-color: ${({ theme }) => theme.palette.main14};
      }
    }
    :hover {
      ${MenuItem} {
        background-color: ${({ theme }) => theme.palette.main3};
      }
    }
  }
`
