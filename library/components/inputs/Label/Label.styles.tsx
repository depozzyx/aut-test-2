import styled, { DefaultTheme, css } from 'styled-components'
import { Text as TextComponent } from '@peiko/components/Text'

export const Text = styled(TextComponent)``

export const TopCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`
export const Label = styled.label<{
  color?: keyof DefaultTheme['palette']
  required?: boolean
  readOnly?: boolean
}>((props) => {
  const { theme, color, required, readOnly } = props
  return css`
    ${Text} {
      ${theme.fonts.f8};
      color: ${(color && theme.palette[color]) || theme.palette.main5};
    }

    ${required &&
    css`
      &:after {
        content: ' *';
        color: ${(color && theme.palette[color]) || theme.palette.main5};
      }
    `}

    &:hover {
      cursor: ${readOnly ? 'default' : 'pointer'};
    }

    pointer-events: ${readOnly ? 'none' : 'auto'};
  `
})
