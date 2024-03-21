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

    border-width: 1px;
    border-radius: 8px;
    padding: ${isOpen ? '0 0 24px' : '0'};

    ${colors({
      bg: palette.base3,
      borderOpen: palette.main2,
      borderHover: hexToRGBA(palette.main2, 0.5),
      borderFocus: hexToRGBA(palette.main2, 0.5),
      borderDisabled: 'transparent',
      isOpen,
      disabled,
    })}
  `,
)

export const Header = styled.div`
  padding: 24px 32px;
`

export const Collapse = styled.div`
  padding: 0 32px;
  ${baseCollapse}
`
