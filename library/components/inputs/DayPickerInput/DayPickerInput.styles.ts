import styled from 'styled-components'

export const PopupContainer = styled.div`
  padding: 24px;
  z-index: 100;
  background: ${({ theme }) => theme.palette.main8};
  border: 1px solid ${({ theme }) => theme.palette.main8};
  border-radius: 20px;
`
