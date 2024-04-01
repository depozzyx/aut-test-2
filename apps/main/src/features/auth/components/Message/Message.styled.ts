import styled from 'styled-components'
import { IconButton } from '@peiko/components/buttons/IconButton'

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 582px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 73px;
  background-color: ${({ theme }) => theme.palette.base};
  box-shadow: ${({ theme }) => theme.shadow.table};
  border-radius: 8px;
`

export const Close = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`
