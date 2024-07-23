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
  Pick<TAccordionProps, 'disabled'> &
    TContainer & { containerStyles: TAccordionProps['headerStyles'] }
>(
  ({ theme, isOpen, disabled, containerStyles }) => css`
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

    ${containerStyles && styleToCss(containerStyles, theme)}
  `,
)

export const Header = styled.button<{ headerStyles?: TAccordionProps['headerStyles'] }>(
  ({ theme, headerStyles }) => css`
    width: 100%;

    ${headerStyles && styleToCss(headerStyles, theme)}
  `,
)

export const Collapse = styled.div`
  ${baseCollapse}
`
