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
  max-width: 552px;
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
export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.palette.main5};
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
`
