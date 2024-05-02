import styled from 'styled-components'

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

export const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  input[type='checkbox'] {
    margin-right: 10px;
  }
`
