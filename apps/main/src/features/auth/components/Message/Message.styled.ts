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

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.main5};
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
`
