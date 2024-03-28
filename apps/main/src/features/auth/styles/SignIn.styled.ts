import styled from 'styled-components'

const commonStyles = `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  ${commonStyles};
  max-width: 332px;
  padding: 32px 48px;
  gap: 56px;
  background-color: ${({ theme }) => theme.palette.base};
  box-shadow: ${({ theme }) => theme.shadow.table};
  border-radius: 8px;
`

export const FormWrapper = styled.div`
  ${commonStyles};
  gap: 24px;
`

export const Title = styled.h1`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  color: ${({ theme }) => theme.palette.main5};
`

export const Fields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const EmailField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const WarningText = styled.span`
  color: ${({ theme }) => theme.palette.main17};
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export const ForgotPassword = styled.span`
  color: ${({ theme }) => theme.palette.main5};
  text-align: right;
  align-self: flex-end;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  cursor: pointer;
`
