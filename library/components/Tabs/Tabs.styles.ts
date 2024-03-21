import styled from 'styled-components'
import { TextButton } from '@peiko/components/buttons/TextButton'
import { TTabButtonprops } from './types'

export const TabList = styled.div`
  display: flex;
`

export const TabButton = styled(TextButton)<TTabButtonprops>`
  border: none;
  border-radius: 0;
  padding: 10px 20px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.main2 : theme.palette.main8};
  border-bottom: 2px solid;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.main2 : 'transparent'};
`
