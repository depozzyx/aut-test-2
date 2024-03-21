import styled, { DefaultTheme, css } from 'styled-components'

type TIconContainerProps = {
  disabled?: boolean
}

export const Container = styled.div<TIconContainerProps>(({ disabled, theme }) => {
  const iconColor = (color: keyof DefaultTheme['palette']) => {
    if (!color) return ''

    return css`
      svg path {
        stroke: ${theme.palette[color]};
      }
    `
  }

  return css`
    display: flex;
    margin-right: 22px;
    outline: none;
    cursor: pointer;

    ${iconColor('main8')}

    &:focus {
      ${iconColor('main8')}
    }

    &:hover {
      ${iconColor('main8')}
    }

    ${disabled &&
    css`
      ${iconColor('main8')}
      pointer-events: none;
    `}
  `
})
