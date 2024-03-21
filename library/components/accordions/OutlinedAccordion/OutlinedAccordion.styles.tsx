import styled, { css } from 'styled-components'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import {
  TAccordionProps,
  TContainer,
  baseCollapse,
  baseContainer,
  colors,
} from '@peiko/components/accordions'

export const Container = styled.button<Pick<TAccordionProps, 'disabled'> & TContainer>(
  ({ theme: { palette }, isOpen, disabled }) => css`
    ${baseContainer}
    border-width: 0;
    border-bottom-width: 1px;
    padding: ${isOpen ? '0 0 24px' : '0'};

    ${colors({
      border: palette.main8,
      borderOpen: palette.main2,
      borderHover: palette.main2,
      borderFocus: palette.main2,
      borderDisabled: hexToRGBA(palette.main8, 0.3),
      isOpen,
      disabled,
    })}
  `,
)

export const Header = styled.div`
  padding: 24px 0;
`

export const Collapse = styled.div`
  ${baseCollapse}
`
