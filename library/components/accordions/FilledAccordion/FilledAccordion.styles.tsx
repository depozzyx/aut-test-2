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

export const Container = styled.button<
  Pick<TAccordionProps, 'disabled'> &
    TContainer & { containerStyles?: TAccordionProps['headerStyles'] }
>(
  ({ theme, isOpen, disabled, containerStyles }) => css`
    ${baseContainer};

    border-width: 1px;
    border-radius: 8px;
    padding: ${isOpen ? '0 0 24px' : '0'};

    ${colors({
      bg: theme.palette.base3,
      borderOpen: theme.palette.main2,
      borderHover: hexToRGBA(theme.palette.main2, 0.5),
      borderFocus: hexToRGBA(theme.palette.main2, 0.5),
      borderDisabled: 'transparent',
      isOpen,
      disabled,
    })}

    ${containerStyles && styleToCss(containerStyles, theme)}
  `,
)

export const Header = styled.div<{ headerStyles?: TAccordionProps['headerStyles'] }>(
  ({ theme, headerStyles }) => css`
    padding: 24px 32px;

    ${headerStyles && styleToCss(headerStyles, theme)}
  `,
)

export const Collapse = styled.div<{
  collapseStyles?: TAccordionProps['collapseStyles']
}>(
  ({ theme, collapseStyles }) => css`
    padding: 0 32px;
    ${baseCollapse}
    ${collapseStyles && styleToCss(collapseStyles, theme)}
  `,
)
