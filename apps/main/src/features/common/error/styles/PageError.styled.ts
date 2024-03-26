import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

export const ErrorText = styled.h2`
  color: ${({ theme }) => theme.palette.main5};
  font-family: Roboto, sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
