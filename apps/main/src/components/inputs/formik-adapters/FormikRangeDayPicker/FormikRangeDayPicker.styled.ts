import { BaseButton } from '@peiko/components/buttons/BaseButton'
import styled from 'styled-components'

export const TriggerButton = styled(BaseButton)<{ isOpen: boolean }>`
  height: 30px;
  padding: 3px 16px;
  background: ${({ theme }) => theme.palette.base};
  border: 1px solid
    ${({ theme, isOpen }) => (isOpen ? theme.palette.main2 : theme.palette.main21)};
  border-radius: 4px;
  width: 326px;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.f8}
  color: ${({ theme }) => theme.palette.main5}
`
