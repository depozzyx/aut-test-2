import styled, { DefaultTheme, css } from 'styled-components'

type TIconContainerProps = {
  disabled?: boolean
}

export const Container = styled.div<TIconContainerProps>(({ disabled, theme }) => {
  const iconColor = (color: keyof DefaultTheme['palette']) => {
    if (!color) return ''

    return css`
      svg path {
        stroke: ${theme.palette[color] || theme.palette.main3};
      }
    `
  }

  return css`
    display: flex;
    margin-right: 8px;
    outline: none;
    cursor: pointer;

    ${iconColor('main3')}

    &:focus {
      ${iconColor('main3')}
    }

    &:hover {
      ${iconColor('main3')}
    }

    ${disabled &&
    css`
      ${iconColor('main3')}
      pointer-events: none;
    `}
  `
})
