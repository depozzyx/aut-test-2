import styled from 'styled-components'

export const Container = styled.div`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.palette.base};
  padding: 10px 100px 10px 0;
  transition: background-color 200ms linear;
  height: 78px;
  border-bottom: 1px solid ${(props) => props.theme.palette.main21};
  //position: fixed;
  //z-index: ${(props) => props.theme.zIndex.medium};
`
