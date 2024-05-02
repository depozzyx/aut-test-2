import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import styled from 'styled-components'

export const MenuContainer = styled.div<{ minWidth?: string; maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.base2};
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.main3};
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  min-width: ${({ minWidth }) => minWidth ?? 'auto'};
  overflow: auto;
  max-height: ${({ maxHeight }) => maxHeight ?? 'auto'};
`

export const MenuItem = styled.label<{ checked?: boolean }>`
  cursor: pointer;
  padding: 0 12px;
  min-height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, checked }) =>
    checked ? theme.palette.base4 : hexToRGBA(theme.palette.base4, 0)};
  transition: 0.3s;
  input[type='checkbox'] {
    margin-right: 10px;
    display: none;
    & + p + div {
      opacity: 0;
      transition: 0.3s;
      height: 24px;
    }
    &:checked + p + div {
      opacity: 1;
    }
  }

  :not(:last-of-type) {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.palette.main3};
  }
`
