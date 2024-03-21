import styled from 'styled-components'

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: ${(props) => props.theme.zIndex.medium};
  width: 100%;
  background: ${(props) => props.theme.palette.base2};
  padding: 0 16px;
  transition: background-color 200ms linear;
`
