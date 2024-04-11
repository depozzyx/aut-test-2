import { FilledChip } from '@peiko/components/chips/FilledChip'
import styled, { css } from 'styled-components'

export const Trigger = styled(FilledChip)((props) => {
  const { theme } = props

  return css`
    border-radius: 8px;
    background-color: ${theme.palette.main14};
    cursor: pointer;
  `
})

export const Menu = styled.div`
  width: 100%;
  max-width: 184px;
  background-color: ${({ theme }) => theme.palette.main3};
`

export const MenuItem = styled.div`
  padding: 6px 0;
`
