import { BaseButton } from '@peiko/components/buttons/BaseButton'
import styled from 'styled-components'

export const BaseTrigger = styled(BaseButton)`
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.palette.base};
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.main10};
  min-height: 32px;
  border-radius: 4px;
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  ${({ theme }) => theme.fonts.f8}
  color: ${({ theme }) => theme.palette.main4}
`
