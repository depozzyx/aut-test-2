import styled, { css } from 'styled-components'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
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
  const {
    theme: { palette, fonts },
    tabIndex,
    disabled,
  } = props

  return css`
    width: unset;
    padding-left: 5px;
    padding-right: 5px;
    min-width: 40px;
    max-width: 100px;
    border-radius: 8px;
    background-color: ${palette.transparent};
    color: ${palette.main5};
    ${fonts.f8}

    ${props.active && `background-color: ${palette.main2}; color: ${palette.base};`}

    ${disabled &&
    `background-color: ${palette.transparent} !important; color: ${palette.main22}; `}

    ${!tabIndex &&
    `
      svg path {
        fill: ${palette.main2};
      }
    `}
    :hover {
      color: ${palette.main2};
      background-color: ${palette.base4};
    }
    :focus,
    :active {
      color: ${palette.base};
      background-color: ${palette.main3};
    }
    :active {
      box-shadow: 0 0 0 4px ${hexToRGBA(palette.main3, 0.3)};
    }
  `
})
