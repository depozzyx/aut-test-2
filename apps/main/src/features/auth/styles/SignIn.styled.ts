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

export const LogoWrapper = styled.div`
  ${commonStyles};
  gap: 8px;
`

export const FormWrapper = styled.div`
  ${commonStyles};
  gap: 24px;
`
