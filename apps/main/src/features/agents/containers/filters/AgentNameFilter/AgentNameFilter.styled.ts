import styled, { css } from 'styled-components'
import { BaseTrigger } from '@/components/dropdown-triggers/BaseTrigger'

export const StyledTrigger = styled(BaseTrigger)((props) => {
  const { theme } = props

  return css`
    &:hover {
      background-color: ${theme.palette.base4};
    }
  `
})
