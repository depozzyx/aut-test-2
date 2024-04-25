import styled, { css } from 'styled-components'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import {
  TAccordionProps,
  TContainer,
  baseCollapse,
  baseContainer,
  colors,
} from '@peiko/components/accordions'
import { styleToCss } from '@peiko/styles'

export const Container = styled.div<
  Pick<TAccordionProps, 'disabled' | 'styles'> & TContainer
>(
  ({ theme, isOpen, disabled, styles }) => css`
    ${baseContainer}
    border-width: 0;
    border-bottom-width: 1px;

    ${colors({
      border: theme.palette.main8,
      borderOpen: theme.palette.main2,
      borderHover: theme.palette.main2,
      borderFocus: theme.palette.main2,
      borderDisabled: hexToRGBA(theme.palette.main8, 0.3),
      isOpen,
      disabled,
    })}
    ${styles && styleToCss(styles, theme)}
  `,
)

export const Header = styled.button`
  width: 100%;
`

export const Collapse = styled.div`
  ${baseCollapse}
`
