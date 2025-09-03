import styled from 'styled-components'
import { FilledButton } from '@peiko/components/buttons/FilledButton'

export const StyledButton = styled(FilledButton)(
  ({ theme }) => `
  border-radius: 4px !important;
  background-color: ${theme.palette.base};
  color: ${theme.palette.main4};
  border: 1px solid ${theme.palette.main10};
  ${theme.fonts.f8}

  svg {
    width: 24px !important;
    height: 24px !important;

    path {
      fill: ${theme.palette.main4};
    }
  }
  
  &:hover {
    background-color: ${theme.palette.base4};
  }
`,
)
