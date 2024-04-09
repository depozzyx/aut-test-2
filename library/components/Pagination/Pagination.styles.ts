import styled, { css } from 'styled-components'
import { FilledIconButton } from '../buttons/FilledIconButton'

export const Container = styled.nav<{ disabled?: boolean }>(
  ({ disabled }) => css`
    display: flex;
    flex-wrap: wrap;
    user-select: none;
    ${disabled ? 'pointer-events: none;' : ''}
  `,
)

export const PaginationBtn = styled(FilledIconButton)((props) => {
  const { theme, tabIndex } = props

  return css`
    border-radius: 8px;
    background-color: ${theme.palette.transparent};
    color: ${theme.palette.main5};
    ${theme.fonts.f8}

    ${props.active &&
    `background-color: ${theme.palette.main2}; color: ${theme.palette.base};`}

    ${props.disabled &&
    `background-color: ${theme.palette.transparent} !important; color: ${theme.palette.main22}; `}

    ${!tabIndex &&
    `
      svg path {
        fill: ${theme.palette.main2};
      }
    `}
  `
})
